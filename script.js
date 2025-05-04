// Sample automobile data
const products = [
    {
        id: 1,
        name: "2024 Tesla Model S",
        price: 79999,
        image: "download.jpeg"
    },
    {
        id: 2,
        name: "2023 Ford Mustang",
        price: 55999,
        image: "Ford.jpeg"
    },
    {
        id: 3,
        name: "2024 BMW M3",
        price: 69999,
        image: "BMW.jpeg"
    },
    {
        id: 4,
        name: "2023 Audi Q5",
        price: 43999,
        image: "Audi.jpeg"
    }
];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");

let cart = [];

// Render products on the page
function renderProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toLocaleString()}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

// Render cart items
function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalContainer.textContent = "";
        cartCount.textContent = "0";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-qty">x${item.quantity}</span>
            <span class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</span>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalContainer.textContent = `Total: $${total.toLocaleString()}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    renderCart();
}

// Event delegation for add to cart buttons
productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        addToCart(productId);
    }
});

// Initial render
renderProducts();
renderCart();
