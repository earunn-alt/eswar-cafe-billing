# Eswar Cafe Billing — Configurable Counter Tokens

One print action produces one continuous receipt:
1. Customer bill with all items, quantities, prices, and total.
2. Counter tokens containing only the categories assigned to each counter.

## Configure token counters
Go to **Backup & Settings → Token counter setup**.
- Change the counter name.
- Enter assigned categories separated by commas.
- Save token settings.
- Click **+ Add token counter** to add counters such as `Chaat Counter`, assigned to category `Chaat`.

The menu Category field supports custom category names. Add Chaat menu items with category `Chaat`, then assign that category to the Chaat Counter in settings. Only counters with matching items print. Unassigned items appear on an `OTHER ITEMS` token so no order item is omitted.

Before replacing GitHub files, export a backup from Backup & Settings. App data is stored locally in the browser/device.


## Manage menu categories
In **Items & Prices → Customize categories**:
- Type a category name (for example, `Chaat`) and click **Add category**.
- The category becomes available in the Add/Edit Item category field.
- Use the category filter chips above the item table to view items by category.
- You can remove a custom category only when no menu items use it. Built-in categories stay available.
