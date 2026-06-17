#!/usr/bin/env python3
with open('/Users/zhangtao/Desktop/排房.html','r') as f:
    txt=f.read()

old_header = '''<div style="margin-top:8px;padding:8px 0;border-top:1px solid var(--slate-100);"><div class="sdd"><strong>'+b.dep+'</strong> &middot; '+b.co+(b.ph?' &middot; '+b.ph:'')+'</div>'''

new_header = '''<div style="margin-top:8px;padding:8px 0;border-top:1px solid var(--slate-100);"><div class="sdd"><strong>'+b.dep+'</strong>'+(b.pu?' <span style="color:var(--blue);font-weight:600;">· '+s(b.pu)+'</span>':'')+'<span style="float:right;color:var(--red);font-weight:700;font-size:13px;">'+(b.pp?b.pp+'人':'')+'</span></div><div style="font-size:11px;color:var(--slate-400);margin-top:2px;">'+b.co+(b.ph?' · '+b.ph:'')+'</div>'''

if old_header in txt:
    txt = txt.replace(old_header, new_header)
    print("Header replaced OK")
else:
    print("Header NOT FOUND - trying substring")
    # Fall back to exact byte match
    import re
    m = re.search(r'<div class="sdd"><strong>.*?b\.ph.*?</div>', txt)
    if m:
        print(f"Found: {m.group()[:80]}...")

# Also update the sci line to not duplicate pu/pp
old_sci_start = '''if(b.pu||b.pp)h+='<div class="sci">'''+(b.pu)
# Actually let me just do a simpler find/replace for the sci check
old_sci_check = "if(b.pu||b.pp)h+='<div class=\"sci\">'+(b.pu?'<span>\"+b.pu+\"</span>':'')+(b.pp?'<span>\"+b.pp+\"人</span>':'')"
new_sci_check = "if(b.mt||b.dl||b.pa||b.pm||b.po||b.rmk)h+='<div class=\"sci\">'+(b.mt?'<span>📍\"+b.mt+\"</span>':'')+(b.dl?'<span>🍽\"+b.dl+\"</span>':'')+(b.pa?'<span>住宿\"+b.pa+\"元</span>':'')+(b.pm?'<span>餐费\"+b.pm+\"元</span>':'')+(b.po?'<span>其他\"+b.po+\"元</span>':'')"

# This is getting too complex with escape levels. Let me use python to read and modify the file more carefully.

with open('/Users/zhangtao/Desktop/排房.html','r') as f:
    lines = f.readlines()

# Find line 624 (0-indexed 623) which has the header
for i, line in enumerate(lines):
    if 'sdd"><strong>' in line and 'b.dep' in line and i > 610:
        print(f"Found header at line {i+1}")
        # Replace the content between <div class="sdd"> and the following </div>
        old = '<div class="sdd"><strong>'+b.dep+'</strong> &middot; '+b.co+(b.ph?' &middot; '+b.ph:'')+'</div>'
        new = '<div class="sdd"><strong>'+b.dep+'</strong>'+(b.pu?' <span style="color:var(--blue);font-weight:600;">· '+s(b.pu)+'</span>':'')+'<span style="float:right;color:var(--red);font-weight:700;font-size:13px;">'+(b.pp?b.pp+'人':'')+'</span></div><div style="font-size:11px;color:var(--slate-400);margin-top:2px;">'+b.co+(b.ph?' · '+b.ph:'')+'</div>'
        if old in line:
            lines[i] = line.replace(old, new)
            print(f"  Line {i+1} replaced")
        break

# Find line 625 (0-indexed 624) which has the sci condition
for i, line in enumerate(lines):
    if 'if(b.pu||b.pp)h+=' in line and 'sci">' in line and i > 610:
        print(f"Found sci at line {i+1}")
        old = 'if(b.pu||b.pp)h+='
        new = 'if(b.mt||b.dl||b.pa||b.pm||b.po||b.rmk)h+='
        lines[i] = line.replace(old, new, 1)
        print(f"  Line {i+1} sci check updated")
        # Also remove the pu and pp spans from this line
        old_pu = "+(b.pu?'<span>"+b.pu+"</span>':'')"
        old_pp = "+(b.pp?'<span>"+b.pp+"人</span>':'')"
        lines[i] = lines[i].replace(old_pu, '').replace(old_pp, '')
        print(f"  pu/pp spans removed from sci")
        break

with open('/Users/zhangtao/Desktop/排房.html','w') as f:
    f.writelines(lines)
print("Done")
