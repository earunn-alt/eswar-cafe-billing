# Eswar Cafe Billing – v13 item photo upload

## New feature: upload food photos per menu item
- Add Item and Edit Item forms now include a **＋ Add image** control.
- Clicking it opens the local device file picker (`image/*`).
- A preview is shown before saving; the photo can be removed or replaced.
- Photos are resized to a maximum 560 px side and compressed to JPEG before storage.
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
5. Reload the website with Ctrl + Shift + R. Confirm the status shows **v13**.
6. Open Items & Prices → Add item → click **＋ Add image** → choose a photo → confirm the preview → save the item. Confirm its photo and name/price layout appear in Billing/POS.

## Validation
The inline JavaScript and settings helper are syntax-checked. The package contents and cache version are checked. Full browser interaction testing may depend on the target browser/device; test with one sample menu item before live billing.
