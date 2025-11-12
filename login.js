document.addEventListener("DOMContentLoaded", () => 
{
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");

    // Helper Functions
    const setError = (input, message) => 
    {
        let errorEl = input.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains("error-message")) {
            errorEl = document.createElement("div");
            errorEl.classList.add("error-message");
            input.parentNode.insertBefore(errorEl, input.nextSibling);
        }
        errorEl.innerText = message;
    };

    const clearError = input => 
    {
        const errorEl = input.nextElementSibling;
        if (errorEl && errorEl.classList.contains("error-message")) {
            errorEl.remove();
        }
    };

    const validateEmail = email => /\S+@\S+\.\S+/.test(email);

    const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
    const saveUsers = users => localStorage.setItem("users", JSON.stringify(users));

    // Toggle Forms 
    showSignup.addEventListener("click", () => 
    {
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
        signupForm.querySelector("input").focus();
    });

    showLogin.addEventListener("click", () => 
    {
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
        loginForm.querySelector("input").focus();
    });

    // Signup 
    signupForm.addEventListener("submit", e => 
    {
        e.preventDefault();

        const name = document.getElementById("nameSignup");
        const email = document.getElementById("emailSignup");
        const pass = document.getElementById("passwordSignup");

        let valid = true;
        clearError(name); clearError(email); clearError(pass);

        if (!name.value.trim()) 
        {
            setError(name, "Full Name is required");
            valid = false;
        }
        if (!email.value.trim() || !validateEmail(email.value)) 
        {
            setError(email, "Valid email is required");
            valid = false;
        }
        if (!pass.value.trim() || pass.value.length < 6) 
        {
            setError(pass, "Password must be at least 6 characters");
            valid = false;
        }

        if (!valid) return;

        // Check if email already exists
        const users = getUsers();
        if (users.some(u => u.email === email.value)) 
        {
            setError(email, "Email already registered");
            return;
        }

        users.push({ name: name.value, email: email.value, password: pass.value });
        saveUsers(users);
        alert("Signup successful! You can now log in.");

        signupForm.reset();
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
        loginForm.querySelector("input").focus();
    });

    //  Login 
    loginForm.addEventListener("submit", e => 
    {
        e.preventDefault();

        const email = document.getElementById("emailLogin");
        const pass = document.getElementById("passwordLogin");

        clearError(email); clearError(pass);

        if (!email.value.trim() || !validateEmail(email.value)) 
        {
            setError(email, "Valid email is required");
            return;
        }
        if (!pass.value.trim()) 
        {
            setError(pass, "Password is required");
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.email === email.value && u.password === pass.value);

        if (!user) 
        {
            setError(pass, "Invalid email or password");
            return;
        }

        alert(`Login successful! Welcome, ${user.name}`);
        loginForm.reset();
    });

    //  Smooth navigation 
    document.querySelectorAll("a.nav-link, #profileBtn, #cartBtn").forEach(link => 
    {
        link.addEventListener("click", e => 
        {
            e.preventDefault();
            const href = link.getAttribute("href");
            document.body.classList.add("fade-out");
            setTimeout(() => window.location.href = href, 500);
        });
    });

    //  Highlight the active page 
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach(link => 
    {
        const hrefPage = link.getAttribute("href");
        if (hrefPage === currentPage || (hrefPage === "shop.html" && ["sizeChart.html", "order.html"].includes(currentPage))) 
        {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    const iconPageMap = { "login.html": "profileBtn", "cart.html": "cartBtn" };
    Object.entries(iconPageMap).forEach(([page, id]) => 
    {
        const iconDiv = document.getElementById(id)?.parentElement;
        if (!iconDiv) return;
        if (currentPage === page) iconDiv.classList.add("active");
        else iconDiv.classList.remove("active");
    });
});