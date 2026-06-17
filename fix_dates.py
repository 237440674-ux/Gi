#!/usr/bin/env python3
with open('/Users/zhangtao/Desktop/排房.html','r') as f:
    txt = f.read()

# Find the div that starts the ov-detail-card in renderCal JS
old_pattern = '<div class="ov-detail-card"><span class="dc-dot"'
new_pattern = '<div class="ov-detail-card" data-id="'+bk.id+'" onclick="setBookingDates(\\''+bk.id+'\\')"><span class="dc-dot"'

# The actual content in the file is:
# '<div class=\"ov-detail-card\"><span class=\"dc-dot\"...'
# I need to match that. In the file, it's a JavaScript string literal.
# The actual bytes in the file would be:

# Let's find what's between ov-detail-card and dc-dot
idx = txt.find('ov-detail-card')
if idx >= 0:
    context = txt[idx:idx+60]
    print(f"Context: {repr(context)}")

# Replace: <div class=\"ov-detail-card\">
#   with: <div class=\"ov-detail-card\" data-id=\"'+bk.id+'\" onclick=\"setBookingDates(\\''+bk.id+'\\')\"
old = '<div class=\"ov-detail-card\">'
new = '<div class=\"ov-detail-card\" data-id=\"'+bk.id+'\" onclick=\"setBookingDates(\\''+bk.id+'\\')\">'

# But 'bk' is a JS variable, and we need the Python string to contain:
# data-id=\"'+bk.id+'\" onclick=\"setBookingDates(\\''+bk.id+'\\')\"
# In the JS code, this generates: data-id="bk123" onclick="setBookingDates('bk123')"

# Let me construct this properly:
new_attr = ' data-id=\"'+bk.id+'\" onclick=\"setBookingDates(\\''+bk.id+'\\')\"'

# Wait, 'bk' is a JavaScript variable. In Python, I need to write it literally as part of the string.
# The JS code is: h += '<div class="ov-detail-card" data-id="'+bk.id+'" onclick="setBookingDates(\''+bk.id+'\')">...'
# So in Python, I write the string with the JS variable interpolation:

old_div = '<div class=\"ov-detail-card\">'
new_div = '<div class=\"ov-detail-card\" data-id=\"'+bk.id+'\" onclick=\"setBookingDates(\\''+bk.id+'\\')\">'

# Hmm, in Python \' is an escaped single quote inside a double-quoted string? No, \' inside " is fine.
# Let me use raw strings or just be more careful.

# Actually the simplest approach: just search for the exact sequence and insert the additional attributes

# The file contains: <div class="ov-detail-card"><span class="dc-dot"
# I need to insert:  data-id="'+bk.id+'" onclick="setBookingDates(\''+bk.id+'\')"
# Right after "ov-detail-card"

# Let me use a different approach - scan the JS code in renderCal and modify it
idx = txt.find('detBks.length===0')
if idx >= 0:
    # Find the dh building loop
    dh_start = txt.find("dh+='<div class=\"ov-detail-card\"", idx)
    if dh_start >= 0:
        old_div = txt[dh_start:dh_start+40]
        print(f"Found div: {repr(old_div)}")
        # Insert attributes
        new_div = '<div class=\"ov-detail-card\" data-id=\"'+bk.id+'\" onclick=\"setBookingDates(\\''+bk.id+'\\')\"'
        txt = txt.replace(old_div, new_div)
        print("Replaced OK")
    else:
        print("dh not found after detBks")
        # Search more broadly
        all_matches = []
        pos = 0
        while True:
            pos = txt.find('ov-detail-card', pos)
            if pos < 0: break
            all_matches.append(pos)
            pos += 1
        print(f"ov-detail-card found at positions: {all_matches}")
        # The first one is in CSS, the second should be in JS
        if len(all_matches) >= 2:
            js_pos = all_matches[1]
            context = txt[js_pos-10:js_pos+60]
            print(f"JS context: {repr(context)}")

with open('/Users/zhangtao/Desktop/排房.html','w') as f:
    f.write(txt)
print("Done")
