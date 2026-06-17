#!/usr/bin/env python3
with open('/Users/zhangtao/Desktop/排房1.html','r') as f:
    t = f.read()

# Fix problematic onclick patterns - use single quotes for outer Python string
# to avoid double quote escaping issues

t = t.replace(
    'onclick="whEdit(\'\'+w.id+\'\')"',
    "onclick=\"whEdit(\\'\\'+w.id+\\'\\')\""
)
t = t.replace(
    'onclick="whChk(\'\'+w.id+\'\')"',
    "onclick=\"whChk(\\'\\'+w.id+\\'\\')\""
)
# Also fix whEditSave
t = t.replace(
    'onclick="whEditSave(\'\'+id+\'\')"',
    "onclick=\"whEditSave(\\'\\'+id+\\'\\')\""
)

with open('/Users/zhangtao/Desktop/排房1.html','w') as f:
    f.write(t)

# Verify
import re, subprocess
m = re.search(r'<script>(.*?)</script>', t, re.DOTALL)
if m:
    open('/tmp/wh_final6.js','w').write(m.group(1).strip())
    r = subprocess.run(['node','--check','/tmp/wh_final6.js'], capture_output=True, text=True)
    print('JS:', 'VALID' if r.returncode == 0 else 'INVALID')
    if r.returncode != 0:
        print(r.stderr[:200])
        # Show line 410
        lines = open('/tmp/wh_final6.js').read().split('\n')
        for i in range(408, 413):
            if i < len(lines):
                print(f'{i}: {lines[i][:200]}')
