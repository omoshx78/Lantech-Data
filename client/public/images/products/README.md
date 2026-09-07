Drop your licensed product photos here with these exact filenames
(referenced from `client/src/data/services.js`):

- automotive.jpg  — used by all 3 Automotive course tiers
- hvac.jpg         — used by all 3 HVAC course tiers

Any image format works (jpg/png/webp) as long as the filename + extension
matches the `image` path set on each product in `services.js`. Recommended:
landscape/4:3, at least 800px wide, under ~300KB.

Want a different photo per duration tier instead of one per category? Just
add e.g. `automotive-6-months.jpg` here and change that product's `image`
field in services.js to `/images/products/automotive-6-months.jpg`.

Until a real file is in place, the site shows a placeholder box instead of
a broken image — nothing breaks, it just looks unfinished until you add
the photo.
