# Eswar Cafe Billing — updated prototype

Mobile-friendly offline-first billing app for a small tea shop.

## Included in this version
- Billing / POS without sales summary cards
- Separate Today's Sales page with sales, bill count, Cash and UPI totals
- Menu cards with visible quantity and plus/minus controls
- Current bill with quantity controls and a quick remove-row button
- Simple bill total, without discount/subtotal lines
- Printed receipt columns: Item, QTY, Price, AMT, plus Total only
- Items & Prices category filters and selectable emoji options
- Sales History with clickable bill number to view order details and print
- Expenses, daily reports, settings and JSON backup/restore
- PWA manifest and versioned service worker

## Important limitations
The app stores data in localStorage on each device. It does not synchronise records between laptop and mobile automatically. Cash/UPI is recorded based on the cashier's selection; UPI payment is not automatically verified. Test the app and receipt printer before using it for live sales.

## Update the existing GitHub Pages app
1. Open the `eswar-cafe-billing` repository on GitHub.
2. Click **Add file → Upload files**.
3. Upload the updated `index.html`, `manifest.json`, and `sw.js` from this folder, replacing the existing files when prompted.
4. Commit directly to `main`.
5. Refresh the published site. If an old version remains, close the tab and reopen the URL; a hard refresh may also help.
