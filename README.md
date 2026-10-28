# Eswar Cafe Billing — First working version

This is a mobile-friendly, offline-first Progressive Web App (PWA) starter for a small tea shop. It is plain HTML/CSS/JavaScript; no build tools or subscription are needed.

## Features included
- Fast point-of-sale billing with item tap-to-add, quantity controls, discount and Cash/UPI payment method
- Starter menu with tea, coffee, drinks, snacks and bakery items
- Add/edit/hide/delete menu items
- Receipt preview/printing using the browser print dialog
- Sales history filtered by date, receipt reprint and CSV export
- Expense recording and daily report with payment split and popular items
- Cafe details and full JSON backup/restore
- PWA manifest and service worker for offline app shell after first successful online visit

## Important data limitation
This first version stores data in browser localStorage on each device. **It does not synchronise data automatically between your phone and computer.** Offline capability and multi-device shared data are separate requirements: shared records need a backend/sync service. Use Backup & Settings → Download full backup and Import backup file to transfer records manually between devices for now. Avoid recording real sales until you have tested backups and printing.

## Preview
For offline/PWA service-worker functionality, serve this folder from localhost or a secure HTTPS site. Opening index.html directly still allows basic billing, but service workers will not install from a file:// URL.
- Easiest local test: use VS Code with the Live Server extension, or Python's local server: `python -m http.server 8000`, then open `http://localhost:8000`.
- Test the app on phone and desktop separately. Each browser/device has its own local data.

## Free hosting
1. Create a GitHub account at https://github.com/.
2. Create a public repository, e.g. `eswar-cafe-billing`.
3. Upload `index.html`, `manifest.json`, and `sw.js` to the repository root.
4. Go to Settings → Pages.
5. Select Deploy from a branch, choose `main` and `/(root)`, then Save.
6. Open the URL shown in Pages settings. Visit it online once on each device, then use the browser menu → Add to Home screen / Install app.

GitHub Pages static hosting is free within its current terms. You can also use Netlify or Cloudflare Pages.

## How to get shared data between mobile and computer
You need to add a cloud database and authentication. An affordable route for a small cafe is Supabase (Postgres database + authentication) or Firebase. Their free tiers/limits and policies can change. The app would then need:
- A database schema for menu items, bills, bill items, expenses and settings
- Owner/staff login and access controls
- Sync logic that queues offline bills locally and uploads them when online
- Conflict handling and unique bill IDs
- Secure access rules and tested backup/restore

Do not put database secret/service-role keys inside this static HTML. Backend access must be secured with proper authentication and database policies. Cloud sync also requires conflict resolution; when offline, the device cannot instantly update the other device until internet returns.

## Suggested go-live checklist
- Replace sample menu prices and items with your actual menu.
- Test cash and UPI payment recording.
- Print test receipts on the intended printer (browser printing support depends on device/printer).
- Export a backup and verify it can be restored.
- Set a regular backup routine.
- Check local tax/invoice requirements with your accountant before treating the printed receipt as a tax invoice.
- Do not rely on the app as the only record system until thoroughly tested.

## Current behaviour
- Payment method is a record of what the operator selected; the app does not verify that a UPI payment reached the bank.
- No GST calculation, inventory deduction, customer database, staff login, cloud sync, automatic SMS/WhatsApp receipt, or payment gateway is implemented yet.
