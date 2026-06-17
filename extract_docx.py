#!/usr/bin/env python3
import zipfile, xml.etree.ElementTree as ET

with zipfile.ZipFile("/Users/zhangtao/Desktop/中国消防救援学院货物采购验收表(2).docx") as z:
    xml_content = z.read("word/document.xml")
    root = ET.fromstring(xml_content)
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    texts = []
    for t in root.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t"):
        if t.text:
            texts.append(t.text)
    print("\n".join(texts))
