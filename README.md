# Eswar Cafe Billing — Current receipt update

## Current changes
- Print layout prints only the receipt, not the menu or billing screen.
- Receipt uses the supplied Eswar Cafe mascot logo converted to high-contrast black and white.
- Removed the separate cafe-name heading below the logo.
- Receipt shows bill number, date, payment type, Item / QTY / Price / AMT, and final Total.
- Category filters are available for All, Tea, Coffee, Cold drinks, Snacks and Bakery.

## Publish to GitHub Pages
1. Extract this ZIP.
2. In your repository, choose **Add file → Upload files**.
3. Upload `index.html`, `manifest.json`, and `sw.js`, replacing existing files.
4. Commit directly to `main`.
5. Refresh the live app. If an old version remains, close and reopen the tab or use Ctrl+Shift+R.

## Notes
Data is stored locally in each browser/device. Automatic cross-device sync and verified QR-payment integration are not included. Export a backup before updating as a precaution.
