#!/usr/bin/env python3
import subprocess, json

# Test with node
with open('/tmp/raw_check.js') as f:
    js = f.read()

# Test 1: add } at end
with open('/tmp/test_fix.js','w') as f:
    f.write(js + '\n}')
r = subprocess.run(['node', '--check', '/tmp/test_fix.js'], capture_output=True, text=True)
print(f"Add }} at end: exit={r.returncode}, {r.stderr.split(chr(10))[0][:80]}")

# Test 2: what if we remove rdy()?
import re
js2 = re.sub(r'\nrdy\(\);?\s*$', '', js)
with open('/tmp/test_fix2.js','w') as f:
    f.write(js2 + '\n}')
r = subprocess.run(['node', '--check', '/tmp/test_fix2.js'], capture_output=True, text=True)
print(f"Remove rdy() + add }}: exit={r.returncode}, {r.stderr.split(chr(10))[0][:80]}")
