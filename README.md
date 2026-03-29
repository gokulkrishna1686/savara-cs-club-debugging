# Bug Byte – Fix Report

## Setup

```bash
cd "bug byte savara - bugs/backend"
npm install
node server.js
```

Open `frontend/user/login.html` in browser. Server runs on `http://localhost:5000`.

---

## Credentials

| Role | Username | Password |
|---|---|---|
| User | user | 1234 |
| Admin | admin | 1234 |

---

## All Bugs Fixed

### Easy (UI)

| # | File | Bug | Fix |
|---|---|---|---|
| 1 | `user/register.html` | Password shown as plaintext | `type="password"` |
| 2 | `admin/login.html` | Password shown as plaintext | `type="password"` |
| 3 | `admin/products.html` | Placeholder said "Enter ID" | "Enter product name" |
| 4 | `user/register.html` | Link pointed to `login.htm` | Fixed to `login.html` |
| 5 | `user/cart.html` | "Cart is empty" always visible | Hidden when items exist |
| 6 | `user/home.html` | "No products available" always visible | Hidden when products load |
| 7 | `style.css` | Button hover text invisible (white on white) | Color changed to `#3b82f6` |

### Medium (Logic / API)

| # | File | Bug | Fix |
|---|---|---|---|
| 8 | `admin/dashboard.html` | Called `/api/product` (404) | Fixed to `/api/products` |
| 9 | `admin/orders.html` | Called `/api/order` (404) | Fixed to `/api/orders` |
| 10 | `app.js` | `addToCart` wrote to `cart`, read from `cartItems` | Both use `cartItems` |
| 11 | `app.js` | `placeOrder` read from `buyNowItem`, ignored cart | Reads from `cartItems` |
| 12 | `app.js` | `register()` redirected even on failure | Redirects only on `data.success` |
| 13 | `app.js` | `register()` submitted empty fields | Validates before fetch |
| 14 | `app.js` | Products displayed at `p.price * 2` | Fixed to `p.price` |
| 15 | `app.js` | `addProduct()` function didn't exist | Added with validation |
| 16 | `admin/products.html` | Called `check("admin")` — undefined | Fixed to `checkAdmin()` |
| 17 | `admin/dashboard.html` | Appended raw `d.length` to body | Renders into stat card element |

### Hard (Advanced Logic)

| # | File | Bug | Fix |
|---|---|---|---|
| 18 | `server.js` | Register accepted empty password | Added `!password` check |
| 19 | `server.js` | Register allowed duplicate usernames | Check with `USERS.find()` before push |
| 20 | `server.js` | `POST /api/products` accepted any data | Validates name (string) and price (non-negative number) |
| 21 | `admin/products.html` | Price input accepted text | Added `type="number" min="0"` |
| 22 | `app.js` | `checkAdmin()` silently returned when not logged in | Now redirects to `login.html` |

### Very Hard (Security)

| # | File | Bug | Fix |
|---|---|---|---|
| 23 | `server.js` | Admin login only checked username, ignored password | Checks both username and password |
| 24 | `server.js` + `app.js` | Auth was `localStorage.setItem("admin","true")` — bypassable from console | Server issues a random token; verified server-side on every admin page load |
| 25 | `server.js` | `POST /api/products` open to anyone | `requireAdmin` middleware added |
| 26 | `server.js` | `DELETE /api/products/:id` open to anyone | `requireAdmin` middleware added |
| 27 | `server.js` | `GET /api/orders` open to anyone | `requireAdmin` middleware added |
| 28 | `app.js` | Full card number sent to and stored on server | Masked to `**** **** **** XXXX` before sending |
| 29 | `app.js` + `cart.html` + `orders.html` | Server/storage data injected into `innerHTML` (XSS) | `sanitize()` helper added; `textContent` used where possible |

---

## Additional Fixes (Found During Review)

| # | File | Fix |
|---|---|---|
| 30 | `admin/orders.html` | Page had no `checkAdmin()` — anyone could open it. Added auth check + `x-admin-token` header on fetch |
| 31 | `server.js` | `DELETE /api/products/:id` had no `isNaN` guard on the ID | Added invalid ID check |
| 32 | `server.js` | `POST /api/orders` accepted empty orders | Validates `name` and `items.length > 0` |
| 33 | `app.js` | `deleteProduct()` missing — admin had no way to delete | Added with `x-admin-token` header |
| 34 | `user/checkout.html` | Total always showed ₹0 | Calculates real total from `cartItems` |
| 35 | `user/cart.html` | No way to go to checkout from cart | Added "Proceed to Checkout" button |

---

## UI Improvements

- Admin pages have a shared nav bar (Dashboard / Products / Orders)
- Products page has an inline add-product form
- Cart shows items as rows with name and price
- Checkout shows live cart total
- Dashboard shows product count as a stat card
- Products show "Add to Cart" for users, "Delete" for admins
