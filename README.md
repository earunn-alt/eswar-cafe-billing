# Eswar Cafe Billing – v12 startup and item workflow fix

## Main root-cause fix
The previous app ran the Today's Sales calculation immediately while the page script was loading and assumed `db.bills` already existed. Some older local browser records contain `items` but omit `bills` or `expenses`. That runtime error stopped the rest of the app script before `manageCategory` initialization and before the Save Item button handler was attached. The result could be a partially working interface: category/settings controls rendered by the helper, POS items visible, but Items & Prices and Save Item not working.

v12 fixes this by:
- Normalizing legacy records (`items`, `bills`, `expenses`, and `settings`) before app startup.
- Moving Today's Sales rendering into a safe function rather than running it during script initialization.
- Defining the missing `renderStats()` function used by the Today's Sales tab.
- Binding the Save Item button directly and preventing native form navigation.
- Keeping Items & Prices and POS driven by the same saved `db.items` list; only active saved items appear in POS.
- Showing only user-configured categories in category dropdowns and filters.
- Removing the exact complete sample menu on migration even if category names were renamed; all other custom menu items and sales history remain.
- Updating the service worker script URL and cache version to force the v12 app shell to load.
- Showing `v12` in the top status line so the loaded build can be identified.

## Deploy correctly
1. Download a JSON backup from Backup & Settings first. Keep it outside the repository.
2. Extract this ZIP. The ZIP contents are already at the **repository root** (there is no enclosing subfolder).
3. In GitHub, open `earunn-alt/eswar-cafe-billing` → `main` → Code.
4. Upload/replace these exact root-level files: `index.html`, `settings-fix.js`, `sw.js`, and `README.md`. Keep `manifest.json` and `Eswar-Cafe-original-logo.png` present (replace them too if GitHub prompts).
5. Commit the changes to `main` and wait for the Pages build to report success.
6. Open the Pages website. The top-right status must include `v12`.
7. If the status does not show `v12`, the browser is still using an old app shell. In Chrome: DevTools → Application → Service Workers → Unregister, then Application → Storage → Clear site data. Reload the site.
8. Test: add a category, add one item, confirm it appears in Items & Prices and in Billing/POS. Then refresh and confirm it remains saved.

## Data safety
The app remains local-storage based; v12 does not add cloud sync. Existing bills and custom menu items are preserved by the migration. Export a backup before replacing files. The automatic sample-menu migration only runs when the full known starter menu is detected by the exact sample item names and prices.

## Validation
The inline app JavaScript and settings helper pass Node syntax checks. A dedicated regression harness checks the legacy-record shape that previously caused startup to abort, the sample-menu migration rule, and the shared menu-source assumptions. Interactive Chrome testing could not be completed in this environment, so do the five-minute live test above before real billing.
