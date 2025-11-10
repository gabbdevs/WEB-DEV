document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");

    // Toggle forms
    showSignup.addEventListener("click", () => 
    {
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
    });

    showLogin.addEventListener("click", () => 
    {
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
    });

    // Placeholder alerts
    loginForm.addEventListener("submit", e => 
    {
        e.preventDefault();
        const email = document.getElementById("emailLogin").value;
        const pass = document.getElementById("passwordLogin").value;
        alert(`Login clicked\nEmail: ${email}\nPassword: ${pass}`);
    });

    signupForm.addEventListener("submit", e => 
    {
        e.preventDefault();
        const name = document.getElementById("nameSignup").value;
        const email = document.getElementById("emailSignup").value;
        const pass = document.getElementById("passwordSignup").value;
        alert(`Signup clicked\nName: ${name}\nEmail: ${email}\nPassword: ${pass}`);
    });

    // Smooth navigation for all links
    document.querySelectorAll("a.nav-link, #profileBtn, #cartBtn").forEach(link => {
        link.addEventListener("click", e => 
        {
            e.preventDefault();
            const href = link.getAttribute("href");
            document.body.classList.add("fade-out");
            setTimeout(() => 
            {
                window.location.href = href;
            }, 500); // match the CSS transition duration
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
});
