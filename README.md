# Eswar Cafe Billing — print fix update

This package contains the Eswar Cafe Billing app and a print fix for the duplicate receipt pages seen in Chrome print preview.

## What's changed
- The print area now uses `position: absolute` instead of `position: fixed`, which prevents Chrome from repeating the receipt on subsequent pages.
- Added print page-break protection for the receipt.
- Updated the service-worker cache version so browsers can fetch the updated app shell.

## Update GitHub Pages
1. Extract this ZIP on your computer.
2. Open your GitHub repository: https://github.com/earunn-alt/eswar-cafe-billing
3. Upload/replace `index.html`, `manifest.json`, `sw.js`, and `README.md` in the repository root.
4. Commit the changes to the `main` branch.
5. Open the app and press `Ctrl + Shift + R` to refresh. If it still shows the old version, close the app tab and reopen it.
6. Test a bill using Chrome print preview.

## Data note
The app stores sales and settings in the browser's local storage. Replacing app files should not normally clear that data, but export a backup first from Backup & Settings as a precaution.
