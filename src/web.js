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

    // Nav-links
    document.querySelectorAll(".nav-link").forEach(link => 
    {
        const hrefPage = link.getAttribute("href");
        if (hrefPage === currentPage ||
            (hrefPage === "shop.html" && ["sizeChart.html", "order.html"].includes(currentPage))) {
            link.classList.add("active");
        } else 
        {
            link.classList.remove("active");
        }
    });

    // Nav-icons
    const iconPageMap = 
    {
        "login.html": "profileBtn",
        "cart.html": "cartBtn"
    };

    Object.entries(iconPageMap).forEach(([page, id]) => 
    {
        const iconDiv = document.getElementById(id)?.parentElement;
        if (!iconDiv) return;
        if (currentPage === page) 
        {
            iconDiv.classList.add("active");
        } else 
        {
            iconDiv.classList.remove("active");
        }
    });


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
        // On shop.html, find the container of products
        const container = window.location.pathname.endsWith("shop.html")
            ? document.querySelector(".shop-container")
            : null;
        const items = container ? container.querySelectorAll(":scope > *") : [];

        // Create "No items found" message if on shop.html
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

        // --- Filter function (shop.html only) ---
        function filterItems(query) 
        {
            if (!container) return;

            const normalizedQuery = query.toLowerCase().trim();
            const keywords = normalizedQuery.split(/\s+/);
            let found = false;

            items.forEach(item => {
                const text = item.textContent.toLowerCase().trim();

                // Show item if all keywords appear somewhere in text
                const show = !normalizedQuery || keywords.every(k => text.includes(k));
                item.style.display = show ? "" : "none";
                if (show) found = true;
            });

            if (noItemsMsg) noItemsMsg.style.display = found ? "none" : "block";
        }

        // --- Handle search submit / click ---
        function handleSearch(e) 
        {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;

            if (!window.location.pathname.endsWith("shop.html")) 
            {
                // Redirect from index.html or other pages to shop.html
                document.body.classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
                }, 500);
                return;
            }

            // On shop.html, filter items immediately
            filterItems(query);
        }

        // --- Event listeners ---
        searchInput.addEventListener("input", () => 
        {
            if (window.location.pathname.endsWith("shop.html")) {
                filterItems(searchInput.value.toLowerCase());
            }
        });
        searchForm.addEventListener("submit", handleSearch);
        searchIcon?.addEventListener("click", handleSearch);

        // --- Pre-fill search from URL query on shop.html ---
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