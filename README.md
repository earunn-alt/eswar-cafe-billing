# Eswar Cafe Billing — Category and Item Workflow Update

## Category workflow
1. Open **Backup & Settings → Menu category settings**.
2. Add the categories you want to use.
3. Every configured category has an **×** remove control. If a category is removed, existing items remain in the menu but become uncategorized; edit those items and assign a current category if needed.
4. Only configured categories appear in the Add/Edit Item dropdown and token-counter category selectors.

## Item and POS workflow
1. Open **Items & Prices → Add item**.
2. Enter the item name, price, select a configured category, and save.
3. The item is saved locally and the form closes without navigating away from Items & Prices.
4. Saved, active items are what appear in the Billing/POS menu. Hidden items do not appear there.

## Important
- Export a backup before replacing the files.
- This version still stores data in the browser's local storage; it is not cloud-synced.
- After uploading all files to GitHub Pages, hard-refresh the app (Ctrl+Shift+R). If installed as a PWA, close and reopen it after the service worker updates.
- JavaScript syntax checks passed. Full live-browser interaction testing was not available in this environment, so test category add/remove and item saving with a small test item before using it for live billing.
