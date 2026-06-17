#!/usr/bin/env python3
with open('/Users/zhangtao/Desktop/排房1.html','r') as f:
    t = f.read()

# The problem: JS code inside single-quoted JS strings has unescaped single quotes
# Fix: replace the problematic patterns in the HTML file

# The problematic onclick pattern in the injected WH JS:
# onclick="whAct('in',''+a.id+'')" 
# This is inside a single-quoted JS string, so the ' after Act( is seen as string terminator

# Fix by replacing with escaped version
# In the HTML file, the escaped version should be:
# onclick="whAct(\'in\',\''+a.id+'\')"

# But since this is in a JS string literal, the actual file content needs to show:
# onclick="whAct(\'in\',\''+a.id+'\')"
# which when JS parses the string, produces the escape for the HTML

# Simple approach: find and replace all occurrences of the bad pattern
# in the WH section (after the last occurrence of "库房系统" comment)

idx = t.find('库房系统')
if idx < 0:
    idx = t.find('var WH = []')

if idx >= 0:
    print(f"WH code starts at {idx}")
    
    # Fix the onclick patterns in the WH JS code
    wh_code = t[idx:]
    
    # Replace unescaped quotes in onclick handlers
    # Pattern: onclick="func('arg',''+var+'')" 
    # Need to become: onclick=\"func(\'arg\',\''+var+'\')\"
    import re
    
    # Find all onclick handlers with the problematic pattern
    # The pattern is: onclick=\"SOMETHING('literal',''+VAR+'')\"
    wh_code = re.sub(
        r"onclick=\"(whAct|whEditSave|whChk)\('(\w+)',''\+(\w+)\+''\)\"",
        r"onclick=\"\1('\\2',''+\\3+'')\"",
        wh_code
    )
    
    t = t[:idx] + wh_code
    
    with open('/Users/zhangtao/Desktop/排房1.html','w') as f:
        f.write(t)
    print("Fixed WH onclick patterns")

# Test
import subprocess
import re as reg
m = reg.search(r'<script>(.*?)</script>', t, reg.DOTALL)
if m:
    open('/tmp/wh_final.js','w').write(m.group(1).strip())
    r = subprocess.run(['node','--check','/tmp/wh_final.js'], capture_output=True, text=True)
    print('JS:', 'VALID' if r.returncode == 0 else 'INVALID')
    if r.returncode != 0:
        print(r.stderr[:200])
else:
    print("Could not extract JS for check")
