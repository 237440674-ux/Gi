#!/usr/bin/env python3
with open('/Users/zhangtao/Desktop/排房1.html','r') as f:
    t = f.read()

# Fix imp-zone onclick - use single-quoted Python string to avoid escape issues
old = """onclick="document.getElementById('impFileInp').click()\""""
new = """onclick="document.getElementById(\\'impFileInp\\').click()\""""
if old in t:
    t = t.replace(old, new)
    print("imp-zone onclick fixed")
else:
    print("Pattern not found, trying direct approach")
    t = t.replace(
        'onclick="document.getElementById(',
        'onclick="document.getElementById(\\''
    )
    t = t.replace(
        "').click()\"",
        "\\').click()\""
    )

with open('/Users/zhangtao/Desktop/排房1.html','w') as f:
    f.write(t)

import re, subprocess
m = re.search(r'<script>(.*?)</script>', t, re.DOTALL)
if m:
    open('/tmp/wh_final8.js','w').write(m.group(1).strip())
    r = subprocess.run(['node','--check','/tmp/wh_final8.js'], capture_output=True, text=True)
    print('JS:', 'VALID' if r.returncode == 0 else 'INVALID')
    if r.returncode != 0:
        print(r.stderr[:200])
