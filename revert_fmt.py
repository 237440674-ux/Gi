#!/usr/bin/env python3
with open('/Users/zhangtao/Desktop/排房.html','r') as f:
    txt = f.read()

# Remove fmtDate function
old_fmt = 'function fmtDate(d){var y=d.getFullYear(),m=d.getMonth()+1,dd=d.getDate();return y+'
if old_fmt in txt:
    # Find the exact function and remove it
    start = txt.find('function fmtDate')
    end = txt.find('\n', start)
    while end < len(txt) and txt[end] in '\n\r ':
        end += 1
    # Find until the closing brace+;
    end_func = txt.find(';', start)
    if end_func > 0:
        # Remove the function definition
        # The function is one line: function fmtDate(d){...;return ...;}
        end_of_line = txt.find('\n', start)
        txt = txt[:start] + txt[end_of_line+1:]
        print("fmtDate function removed")

# Replace fmtDate(x) back to x.toISOString().slice(0,10)
import re
# Find all fmtDate(X) calls
for m in re.finditer(r'fmtDate\(([^)]+)\)', txt):
    arg = m.group(1)
    old = f"fmtDate({arg})"
    new = f"{arg}.toISOString().slice(0,10)"
    if old in txt:
        txt = txt.replace(old, new)
        print(f"Reverted: fmtDate({arg})")

with open('/Users/zhangtao/Desktop/排房.html','w') as f:
    f.write(txt)

remaining = txt.count('fmtDate')
print(f"Remaining fmtDate: {remaining}")
