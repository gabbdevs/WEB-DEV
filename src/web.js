document.addEventListener("DOMContentLoaded", () => 
{
    document.body.classList.add("loaded");

    // --- Profile button fade transition ---
    const profileBtn = document.getElementById("profileBtn");
    profileBtn?.addEventListener("click", e => 
    {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => window.location.href = "login.html", 500);
    });

    // --- Fade transition for all navigation links ---
    const navLinks = document.querySelectorAll('.nav-link, .icon a');
    navLinks.forEach(link => 
    {
        link.addEventListener('click', e => 
        {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => window.location.href = link.href, 500);
        });
    });

    // --- Highlight the active page ---
    const currentPage = window.location.pathname.split("/").pop();

    // Define mapping: which page(s) correspond to which main nav link
    const navMap = 
    {
        "index.html": "index.html",
        "shop.html": "shop.html",
        "sizeChart.html": "shop.html",
        "order.html": "shop.html",
        "brand.html": "brand.html",
        "contact.html": "contact.html",
        "login.html": "#profileIcon",
        "cart.html": "#cartIcon"
    };

    // Remove any existing active classes
    document.querySelectorAll(".nav-link, .icon a").forEach(el => el.classList.remove("active"));

    // Add active class based on mapping
    if (navMap[currentPage]?.startsWith("#")) 
    {
        // Special icons (profile/cart)
        document.querySelector(navMap[currentPage])?.parentElement?.parentElement?.classList.add("active");
    } else 
    {
        // Normal nav links
        document.querySelector(`a[href="${navMap[currentPage]}"]`)?.classList.add("active");
    }

    // --- Footer visibility on scroll ---
    window.addEventListener("scroll", () => 
    {
        const footer = document.querySelector("footer");
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        footer.classList.toggle("visible", scrollPosition >= documentHeight - 50);
    });

    // --- Carousel ---
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let index = 0;
    const delay = 3000;

    function showSlide(i) 
    {
        index = (i + slides.length) % slides.length;
        if (track) track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, j) => dot.classList.toggle("active", j === index));
    }

    let interval = setInterval(() => showSlide(index + 1), delay);

    dots.forEach((dot, i) => 
    {
        dot.addEventListener("click", () => 
        {
            clearInterval(interval);
            showSlide(i);
            interval = setInterval(() => showSlide(index + 1), delay);
        });
    });

    showSlide(index);

    // --- Shop search/filter function ---
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const searchIcon = document.getElementById("searchIcon");

    if (searchInput && searchForm) 
    {
        // find container of items automatically(for shop.html)
        const container = searchInput.closest(".shop-container") || document.querySelector(".products, .items, .shop-container");
        let items = container ? container.querySelectorAll(":scope > *") : [];

        // create "No items found" message if container does not exists
        let noItemsMsg;
        if (container) 
        {
            noItemsMsg = document.createElement("p");
            noItemsMsg.textContent = "No items found.";
            noItemsMsg.style.color = "white";
            noItemsMsg.style.fontWeight = "bold";
            noItemsMsg.style.textAlign = "center";
            noItemsMsg.style.marginTop = "20px";
            noItemsMsg.style.display = "none";
            container.parentNode?.insertBefore(noItemsMsg, container.nextSibling);
        }

        // filter function
        function filterItems(query) 
        {
            if (!container) return;
            let found = false;

            items.forEach(item => 
            {
                const text = item.textContent.toLowerCase();
                let show = !query ||
                    (query.includes("tee") && text.includes("tee")) ||
                    (query.includes("hoodie") && text.includes("hoodie")) ||
                    text.includes(query);
                item.style.display = show ? "" : "none";
                if (show) found = true;
            });

            if (noItemsMsg) noItemsMsg.style.display = found ? "none" : "block";
        }

        // handler for submit/click
        function handleSearch(e) 
        {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;

            // If not on shop.html, redirect
            if (!window.location.pathname.endsWith("shop.html")) 
            {
                document.body.classList.add("fade-out"); // reuse existing fade-out CSS
                setTimeout(() => 
                {
                    window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
                }, 500); // match your fade-out duration
                return;
            }

            // Filter immediately if on shop.html
            filterItems(query);
        }

        // --- Event listeners ---
        searchInput.addEventListener("input", () => 
        {
            if (window.location.pathname.endsWith("shop.html")) 
            {
                filterItems(searchInput.value.toLowerCase());
            }
        });
        searchForm.addEventListener("submit", handleSearch);
        searchIcon?.addEventListener("click", handleSearch);

        // --- Pre-fill from URL query on shop.html ---
        if (window.location.pathname.endsWith("shop.html")) 
        {
            const params = new URLSearchParams(window.location.search);
            const q = params.get("q");
            if (q) 
            {
                searchInput.value = q;
                filterItems(q.toLowerCase());
            }
        }
    }


    // --- Cart/Login/Signup ---
    const VAT = 0.12, DISCOUNT = 0.0;
    const PRODUCTS = [
        { 
            id: 'p1', name: 'T-Shirt', price: 350 
        },
        { 
            id: 'p2', name: 'Jeans', price: 1200 
        },
        { 
            id: 'p3', name: 'Cap', price: 200 
        },
    ];

    const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
    const saveUsers = u => localStorage.setItem('users', JSON.stringify(u));
    const getCart = email => JSON.parse(localStorage.getItem('cart_' + email) || '[]');
    const saveCart = (email, cart) => localStorage.setItem('cart_' + email, JSON.stringify(cart));

    function signup(name, email, pass) 
    {
        const users = getUsers();
        if (users.find(u => u.email === email)) return alert("Email already used");
        users.push({ name, email, pass });
        saveUsers(users);
        alert("Signup successful");
    }

    function login(email, pass) 
    {
        const u = getUsers().find(x => x.email === email && x.pass === pass);
        if (!u) return alert("Invalid email or password");
        localStorage.setItem('current', u.email);
        alert("Login success");
    }

    function addToCart(id) 
    {
        const email = localStorage.getItem('current');
        if (!email) return alert("Login first");
        const product = PRODUCTS.find(p => p.id === id);
        let cart = getCart(email);
        const existing = cart.find(c => c.id === id);
        if (existing) existing.qty++; else cart.push({ ...product, qty: 1 });
        saveCart(email, cart);
        alert("Added to cart");
    }

    function removeFromCart(id) 
    {
        const email = localStorage.getItem('current');
        if (!email) return alert("Login first");
        saveCart(email, getCart(email).filter(i => i.id !== id));
        alert("Item removed");
    }

    function computeTotal(cart) {
        const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const discount = sub * DISCOUNT;
        const vat = (sub - discount) * VAT;
        return { sub, discount, vat, total: sub - discount + vat };
    }

    function pay() 
    {
        const email = localStorage.getItem('current');
        if (!email) return alert("Login first");
        const cart = getCart(email);
        if (cart.length === 0) return alert("Cart is empty");
        const t = computeTotal(cart);
        alert(`Payment success!\nTotal: ₱${t.total.toFixed(2)}`);
        saveCart(email, []);
    }

    function exit() 
    {
        localStorage.removeItem('current');
        alert("Logged out");
    }

    // --- Placeholder buttons ---
    const btns = ['btnLogin', 'btnSignup', 'btnAdd', 'btnRemove', 'btnPay', 'btnExit'];
    btns.forEach(id => 
    {
        const btn = document.getElementById(id);
        if (btn) btn.onclick = () => alert(`${id} clicked (connect later)`);
    });
});