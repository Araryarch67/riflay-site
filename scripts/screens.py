"""Makes 720- and 960-wide copies of each screenshot in public/screens and writes lib/screens.ts (needs Pillow).
Run from the site's folder after adding or changing a screenshot:  python scripts/screens.py"""
import os
import re
from PIL import Image

d = 'public/screens'
for f in sorted(os.listdir(d)):
    if not f.endswith('.webp') or re.search(r'-w\d+\.webp$', f):
        continue
    im = Image.open(os.path.join(d, f))
    w, h = im.size
    for tw in (720, 960):
        out = os.path.join(d, f'{f[:-5]}-w{tw}.webp')
        if w > tw and not os.path.exists(out):
            im.resize((tw, round(h * tw / w)), Image.LANCZOS).save(out, 'WEBP', quality=80, method=6)
print('copies made; now update SCREEN_WIDTHS in lib/screens.ts for new screenshots')
