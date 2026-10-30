# Eswar Cafe Billing – v15 menu ordering and item photo crop

## New feature: upload food photos per menu item
- Add Item and Edit Item forms now include a **＋ Add image** control.
- Clicking it opens the local device file picker (`image/*`).
- A preview is shown before saving; the photo can be removed or replaced.
- Photos open in a 16:9 crop editor. Drag to reposition and use the zoom slider; the final 640 × 360 crop is compressed to JPEG before storage.
- The compressed image is saved with the menu item in this browser's local database, so it is available offline.
- Existing items without a photo continue to show their fallback emoji.
- Items with a photo show it on the Billing/POS card and in the Items & Prices list.
- POS cards place item name at the left and price at the right on the same line.

## Important storage note
This version still uses browser local storage; it does not upload photos to a cloud service. Images are compressed to keep local storage use modest. For menus with many large photos, export backups regularly and consider moving image files to IndexedDB or cloud storage in a later implementation.

## Deploy
1. Export a JSON backup from Backup & Settings before updating.
2. Extract this ZIP. All files are at the ZIP root.
3. Replace the root-level `index.html`, `sw.js`, `settings-fix.js`, `manifest.json`, `README.md`, and keep `Eswar-Cafe-original-logo.png` in the root.
4. Commit to the `main` branch and wait for GitHub Pages to deploy.
5. Reload the website with Ctrl + Shift + R. Confirm the status shows **v15**.
6. Open Items & Prices → Add item → click **＋ Add image** → choose a photo → confirm the preview → save the item. Confirm its photo and name/price layout appear in Billing/POS.

## Validation
The inline JavaScript and settings helper are syntax-checked. The package contents and cache version are checked. Full browser interaction testing may depend on the target browser/device; test with one sample menu item before live billing.


Version 15 adds an interactive 16:9 food-photo crop editor. Users can drag the photo, zoom, reset, and confirm the crop that matches the POS card before the image is saved locally. Square, portrait, and landscape input photos are accepted.


## Version 15: POS menu ordering
- Added an Edit order / Done mode in the Billing / POS Menu panel.
- Drag category chips horizontally to control the category-filter order. The All filter remains first.
- Drag menu item cards to change the item order. The order is global and remains consistent when filtering by category or searching.
- Added left/right category arrows and up/down item arrows as an alternative to dragging (useful on touch devices).
- Changes save automatically in the existing local browser database and are included in the JSON backup.
- Sorting is separate from category assignment, price, active status, and billing records. Normal billing clicks and quantity controls return when Done is selected.
