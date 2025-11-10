document.addEventListener("DOMContentLoaded", () => {
    const shopContainer = document.getElementById("shopContainer");
    const searchInput = document.getElementById("searchInput");

    if (!window.PRODUCTS) window.PRODUCTS = []; // fallback

    // --- Render Products ---
    function renderProducts(products) {
        if (!shopContainer) return;
        shopContainer.innerHTML = "";

        products.forEach(p => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <p class="product-name" style="font-weight: bold;">${p.name}</p>
                <p class="price">₱${p.price}</p>
                <button class="add-to-cart">+</button>
            `;
            shopContainer.appendChild(div);
        });
    }

    // --- Add-to-Cart (event delegation) ---
    shopContainer.addEventListener("click", e => {
        if (e.target.classList.contains("add-to-cart")) {
            const productDiv = e.target.closest(".product");
            const name = productDiv.querySelector(".product-name").innerText;
            const price = productDiv.querySelector(".price").innerText;
            const imgSrc = productDiv.querySelector("img").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name, price, imgSrc });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        }
    });

    // --- Filter products on shop page ---
    function filterProducts(query) {
        return window.PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }

    // --- Check URL search param ---
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    let productsToRender = window.PRODUCTS;

    if (searchQuery) {
        productsToRender = filterProducts(searchQuery);
        if (searchInput) searchInput.value = searchQuery;
    }

    renderProducts(productsToRender);

    // --- Live search filter on shop page ---
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const filtered = filterProducts(searchInput.value);
            renderProducts(filtered);
        });

        searchInput.addEventListener("keypress", e => {
            if (e.key === "Enter") e.preventDefault(); // live filtering, no redirect
        });
    }
});