# Eswar Cafe Billing – v11 item and menu workflow fix

## What changed
- The app no longer seeds the POS with demo items on a fresh install or when the saved item list is empty.
- On upgrade, if the complete original built-in demo menu is present, it is removed once while custom items and bill history are preserved.
- Item saving now has an explicit Save Item click handler (`type="button"`) as well as a guarded form-submit handler, preventing native form navigation/reload.
- The configured Menu Category Settings list is the source for the Add Item category dropdown and category filters.
- Existing items are not deleted when a category is removed; they become uncategorized.
- Service worker cache version is updated to force the new app shell to load.

## Deploy
1. Export a JSON backup from Backup & Settings before updating.
2. Extract this ZIP.
3. Upload/replace all files in the ZIP at the root of the GitHub Pages repository (keep the logo and `settings-fix.js`).
4. Commit to the published branch and wait for GitHub Pages deployment.
5. Open the site and hard-refresh (Ctrl+Shift+R). If the old app remains, clear this site's cached data/service worker and reload.
6. Add a category in Backup & Settings, then add an item in Items & Prices. It should appear in the Items & Prices table and Billing/POS menu.

## Validation
The main inline JavaScript and settings helper pass Node.js syntax checks. Interactive browser testing was not available in this environment; test one category and one item before live billing.
