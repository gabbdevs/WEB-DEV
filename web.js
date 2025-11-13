// ensure that js file run only after that html files are loaded
document.addEventListener("DOMContentLoaded", () => 
{
    // adds class "loaded" t the body tag when the page is ready
    document.body.classList.add("loaded");

    // List of our Products
    window.PRODUCTS = [
        { id: 'p1', name: 'Green Own The Label Hoodie', price: 1499, img: 'img/image25.jpg' },
        { id: 'p2', name: 'Maroon Own The Label Hoodie', price: 1499, img: 'img/image24.jpg' },
        { id: 'p3', name: 'Blue Own The Label Hoodie', price: 1499, img: 'img/image4.jpg' },
        { id: 'p4', name: 'Black Own The Label Hoodie', price: 1499, img: 'img/image23.jpg' },
        { id: 'p5', name: 'Purple Own The Label Hoodie', price: 1499, img: 'img/image2.jpg' },
        { id: 'p6', name: 'Brown Own The Label Hoodie', price: 1499, img: 'img/image1.jpg' },
        { id: 'p7', name: 'Dark Blue Own The Label Hoodie', price: 1499, img: 'img/image5.jpg' },
        { id: 'p8', name: 'Gray Own The Label Hoodie', price: 1499, img: 'img/image3.jpg' },
        { id: 'p9', name: 'Pink Own The Label Hoodie', price: 1499, img: 'img/image7.jpg' },
        { id: 'p10', name: "Blue Lightning Own The Label Hoodie", price: 1899, img: "img/image19.jpg" },
        { id: 'p11', name: "Oreo Own The Label Hoodie", price: 1899, img: "img/image20.jpg" },
        { id: 'p12', name: "Lavender Lightning Own The Label Hoodie", price: 1899, img: "img/image21.jpg" },
        { id: 'p13', name: "Oreo Lightning Own The Label Hoodie", price: 1899, img: "img/image22.jpg" },
        { id: 'p14', name: 'Black Own The Label Tee with Blossom Design', price: 799, img: 'img/image9.jpg' },
        { id: 'p15', name: 'Gray Own The Label Tee with Blossom Design', price: 799, img: 'img/image10.jpg' },
        { id: 'p16', name: 'Black Own The Label Tee', price: 799, img: 'img/image11.jpg' },
        { id: 'p17', name: 'Red Own The Label Tee', price: 799, img: 'img/image12.jpg' },
        { id: 'p18', name: 'Sky Blue Own The Label Tee', price: 799, img: 'img/image13.jpg' },
        { id: 'p19', name: 'Brown Own The Label Tee', price: 799, img: 'img/image14.jpg' },
        { id: 'p20', name: 'Pink Own The Label Tee', price: 799, img: 'img/image15.jpg' },
        { id: 'p21', name: 'Lavender Own The Label Tee', price: 799, img: 'img/image16.jpg' },
        { id: 'p22', name: 'Purple Own The Label Tee', price: 799, img: 'img/image17.jpg' },
        { id: 'p23', name: 'Green Own The Label Tee', price: 799, img: 'img/image18.jpg' }
    ];

    // Profile Fade(button & redirect)
    const profileBtn = document.getElementById("profileBtn");
    profileBtn?.addEventListener("click", e => 
    {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => window.location.href = "login.html", 500);
    });

    // Navs transition fade
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

    // Highlight Active Page
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => 
    {
        const hrefPage = link.getAttribute("href");
        link.classList.toggle("active", hrefPage === currentPage);
    });

    // Footer Visibility while scrolling
    window.addEventListener("scroll", () => 
    {
        const footer = document.querySelector("footer");
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        footer?.classList.toggle("visible", scrollPosition >= documentHeight - 50);
    });

    // Image Carousel on homepage(index.html)
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

    if (track && slides.length && dots.length) 
    {
        showSlide(index);
        let interval = setInterval(() => showSlide(index + 1), delay);
        dots.forEach((dot, i) => dot.addEventListener("click", () => 
        {
            clearInterval(interval);
            showSlide(i);
            interval = setInterval(() => showSlide(index + 1), delay);
        }));
    }

    // Header Search Redirect (except shop page)
    if (!currentPage.includes("shop.html")) 
    {
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("keypress", (e) => 
            {
                if (e.key === "Enter")
                {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (!query) return;
                    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                }
            });
        }
    }
});