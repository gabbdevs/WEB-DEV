document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});
// profile button
const profileBtn = document.getElementById("profileBtn");
profileBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
});
window.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 50) {
        footer.classList.add("visible");
    } else {
        footer.classList.remove("visible");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let index = 0;
    const delay = 3000;

    const showSlide = (i) => {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, j) => dot.classList.toggle("active", j === index));
    };

    const nextSlide = () => showSlide(index + 1);
    let interval = setInterval(nextSlide, delay);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            clearInterval(interval);
            showSlide(i);
            interval = setInterval(nextSlide, delay);
        });
    });

    showSlide(index);
    // main.js - simple JS for login/signup, cart, and payment

    // --- Settings ---
    const VAT = 0.12; // 12% VAT
    const DISCOUNT = 0.0; // discount %

    const PRODUCTS = [
        { id: 'p1', name: 'T-Shirt', price: 350 },
        { id: 'p2', name: 'Jeans', price: 1200 },
        { id: 'p3', name: 'Cap', price: 200 },
    ];

    // --- Storage Helpers ---
    function getUsers() { return JSON.parse(localStorage.getItem('users') || '[]'); }
    function saveUsers(u) { localStorage.setItem('users', JSON.stringify(u)); }
    function getCart(email) { return JSON.parse(localStorage.getItem('cart_' + email) || '[]'); }
    function saveCart(email, cart) { localStorage.setItem('cart_' + email, JSON.stringify(cart)); }

    // --- Signup ---
    function signup(name, email, pass) {
        const users = getUsers();
        if (users.find(u => u.email === email)) return alert("Email already used");
        users.push({ name, email, pass });
        saveUsers(users);
        alert("Signup successful");
    }

    // --- Login ---
    function login(email, pass) {
        const u = getUsers().find(x => x.email === email && x.pass === pass);
        if (!u) return alert("Invalid email or password");
        localStorage.setItem('current', u.email);
        alert("Login success");
    }

    // --- Cart ---
    function addToCart(id) {
        const email = localStorage.getItem('current');
        if (!email) return alert("Login first");
        const product = PRODUCTS.find(p => p.id === id);
        let cart = getCart(email);
        const existing = cart.find(c => c.id === id);
        if (existing) existing.qty++;
        else cart.push({ ...product, qty: 1 });
        saveCart(email, cart);
        alert("Added to cart");
    }

    function removeFromCart(id) {
        const email = localStorage.getItem('current');
        if (!email) return alert("Login first");
        let cart = getCart(email).filter(i => i.id !== id);
        saveCart(email, cart);
        alert("Item removed");
    }

    // --- Totals ---
    function computeTotal(cart) {
        const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const discount = sub * DISCOUNT;
        const vat = (sub - discount) * VAT;
        return { sub, discount, vat, total: sub - discount + vat };
    }

    // --- Payment (simulated) ---
    function pay() {
        const email = localStorage.getItem('current');
        if (!email) return alert("Login first");
        const cart = getCart(email);
        if (cart.length === 0) return alert("Cart is empty");
        const t = computeTotal(cart);
        alert(`Payment success!\nTotal: ₱${t.total.toFixed(2)}`);
        saveCart(email, []); // clear cart
    }

    // --- Exit / Logout ---
    function exit() {
        localStorage.removeItem('current');
        alert("Logged out");
    }

    // --- Placeholder buttons (you will connect your real ones later) ---
    // Replace 'btnLogin', 'btnSignup', etc. with your actual button IDs
    document.addEventListener('DOMContentLoaded', () => {
        const btnLogin = document.getElementById('btnLogin'); // ← change to your login button ID
        const btnSignup = document.getElementById('btnSignup'); // ← change to your signup button ID
        const btnAdd = document.getElementById('btnAdd'); // ← change to your add-to-cart button ID
        const btnRemove = document.getElementById('btnRemove'); // ← change to your remove button ID
        const btnPay = document.getElementById('btnPay'); // ← change to your pay button ID
        const btnExit = document.getElementById('btnExit'); // ← change to your exit button ID

        if (btnLogin) btnLogin.onclick = () => alert("Login button clicked (connect later)");
        if (btnSignup) btnSignup.onclick = () => alert("Signup button clicked (connect later)");
        if (btnAdd) btnAdd.onclick = () => alert("Add to cart button clicked (connect later)");
        if (btnRemove) btnRemove.onclick = () => alert("Remove button clicked (connect later)");
        if (btnPay) btnPay.onclick = () => alert("Payment button clicked (connect later)");
        if (btnExit) btnExit.onclick = () => alert("Exit button clicked (connect later)");
    });


});
