# Bug Fixes

- **Admin login wasn't checking password** — it only checked the username, so anyone could log in as admin with any password
- **Delete product broke with invalid IDs** — if the ID wasn't a number, nothing got deleted and no error was shown
- **Orders were saved without any validation** — empty orders with no items or name were being accepted
- **Cart was saving to wrong localStorage key** — it read from `cartItems` but saved to `cart`, so items were never actually saved
- **Checkout ignored cart items** — it only looked for a "buy now" item and skipped the cart entirely
- **Products were showing double the price** — someone wrote `p.price * 2` instead of `p.price`
- **register.html had a broken link** — the back button linked to `login.htm` instead of `login.html`
- **checkout.html had wrong placeholder** — the name field said "Enter email" which was just confusing
- **register.html and admin login had no placeholders** — the input fields were completely blank with no hint of what to type
- **dashboard.html was calling a function that didn't exist** — it called `check("admin")` but the actual function is `checkAdmin()`
- **Button text was invisible** — the text color was the same as the background color
- **Login page heading was invisible** — the heading color was near-white on a white background
- **Product cards were shifted left for no reason** — a stray `position: relative; left: -15px` was moving all the cards out of place
