const API = "http://localhost:5000";

/* LOGIN */
async function userLogin() {
  const res = await fetch(API + "/api/user/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success === true) {
    window.location.href = "home.html";
  } else {
    alert("Login failed");
  }
}

/* REGISTER */
async function register() {
  if (!username.value || !password.value) {
    alert("Username and password are required");
    return;
  }

  const res = await fetch(API + "/api/user/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "login.html";
  } else {
    alert(data.message || "Registration failed");
  }
}

/* PRODUCTS */
async function addProduct() {
  const nameVal = document.getElementById("name").value.trim();
  const priceVal = parseFloat(document.getElementById("price").value);

  if (!nameVal) {
    alert("Product name is required");
    return;
  }
  if (isNaN(priceVal) || priceVal < 0) {
    alert("Price must be a valid non-negative number");
    return;
  }

  const res = await fetch(API + "/api/products", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name: nameVal, price: priceVal })
  });

  const data = await res.json();
  if (data.success) {
    loadProducts();
  } else {
    alert(data.message || "Failed to add product");
  }
}

async function loadProducts() {
  const res = await fetch(API + "/api/products");
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Cart</button>
      </div>
    `;
  });
}

/* CART */
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

/* ORDER */
async function placeOrder() {
  const item = JSON.parse(localStorage.getItem("buyNowItem"));
  const items = item ? [item] : (JSON.parse(localStorage.getItem("cartItems")) || []);

  await fetch(API + "/api/orders", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      items,
      name: name.value,
      card: "**** **** **** " + card.value.slice(-4)
    })
  });

  alert("Order placed!");
}

/* ADMIN */
async function checkAdmin() {
  const token = localStorage.getItem("adminToken");
  if (!token) { window.location.href = "login.html"; return; }
  const res = await fetch(API + "/api/admin/verify", {
    headers: { "x-admin-token": token }
  });
  const data = await res.json();
  if (!data.success) window.location.href = "login.html";
}

async function adminLogin() {
  const res = await fetch(API + "/api/admin/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("adminToken", data.token);
    window.location.href = "dashboard.html";
  }
}