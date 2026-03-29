# Bug Fixes

## Easy (UI)

- **Password fields were showing plaintext** — register and admin login inputs were missing `type="password"`
- **checkout.html had wrong placeholder** — the name field said "Enter email" which was just confusing
- **register.html and admin login had no placeholders** — the input fields were completely blank with no hint of what to type
- **Admin products page had a wrong placeholder** — it said "Enter ID" instead of "Enter product name"
- **register.html had a broken link** — the back button linked to `login.htm` instead of `login.html`
- **"Cart is empty" message was always visible** — it stayed on screen even when there were items in the cart
- **"No products available" was always visible** — it didn't hide when products loaded in
- **Button text was invisible** — the text color was the same as the background color
- **Login page heading was invisible** — the heading color was near-white on a white background
- **Button hover text turned invisible** — hover state set text to white on a white background
- **Product cards were shifted left for no reason** — a stray `position: relative; left: -15px` was moving all the cards out of place

## Medium (Logic / API)

- **Register redirected even when it failed** — it went to login regardless of whether the server said success or not
- **Dashboard was calling the wrong API endpoint** — `/api/product` doesn't exist, it should be `/api/products`
- **Orders page was calling the wrong API endpoint** — `/api/order` doesn't exist, it should be `/api/orders`
- **Cart was saving to wrong localStorage key** — it read from `cartItems` but saved to `cart`, so items were never actually saved
- **checkAdmin silently did nothing when not logged in** — it just returned without redirecting, now sends to login.html
- **Products were showing double the price** — someone wrote `p.price * 2` instead of `p.price`
- **Checkout always showed ₹0 as total** — it never calculated the actual cart total
- **Checkout ignored cart items** — it only looked for a "buy now" item and skipped the cart entirely
- **dashboard.html was calling a function that didn't exist** — it called `check("admin")` but the actual function is `checkAdmin()`

## Hard (Advanced Logic)

- **Register submitted with empty fields** — no validation, so blank usernames and passwords were being sent
- **Register accepted empty passwords** — server wasn't checking if the password field was actually filled
- **Duplicate usernames were allowed** — server didn't check if a username already existed before adding it
- **Orders were saved without any validation** — empty orders with no items or name were being accepted
- **Delete product broke with invalid IDs** — if the ID wasn't a number, nothing got deleted and no error was shown
- **addProduct function didn't exist** — the admin had a button to add products but no function behind it
- **deleteProduct function didn't exist** — admins had no way to actually delete a product from the UI
- **Cart had no way to go to checkout** — there was no button or link to proceed from the cart page

## Very Hard (Security)

- **Admin login wasn't checking password** — it only checked the username, so anyone could log in as admin with any password
- **Admin auth was just a localStorage flag** — setting `admin=true` in the console gave full access, so server now issues a real token
- **Anyone could add or delete products** — those API routes had no auth check on the server
- **Anyone could view all orders** — the orders API was completely open with no protection
- **Orders page had no auth check** — anyone who knew the URL could open it, now verifies admin token on load
- **Full card number was being sent to the server** — card details should never be stored, now only the last 4 digits are kept
- **User data was injected into innerHTML** — product names and order data could contain malicious HTML, now sanitized before rendering

## Additional Fixes

- **Orders page had no auth check at all** — anyone could open it directly, added checkAdmin() and sent the token with the fetch request
- **Delete product had no ID validation** — passing a non-numeric ID would silently do nothing, added an isNaN guard
- **Post order accepted anything** — no check on name or items, now validates both before saving
- **deleteProduct function was missing** — admins couldn't delete products from the UI, added the function with the auth token
- **Checkout always showed ₹0** — total was hardcoded, now calculates the real sum from cartItems
- **Cart had no way forward** — there was no link or button to go to checkout, added a "Proceed to Checkout" button

## UI Improvements

- Admin pages now have a shared nav bar to switch between Dashboard, Products, and Orders
- Products page has an inline form to add new products without going to a separate page
- Cart shows each item as a row with the name and price clearly listed
- Checkout displays a live total calculated from the cart
- Dashboard shows the product count as a stat card instead of just dumping a number
- Product cards show "Add to Cart" for users and a "Delete" button for admins
