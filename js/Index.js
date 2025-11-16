
console.log("Ibhoni JS Loaded ✅");

// 1️⃣ Welcome Message
window.addEventListener("load", () => {
    if (!sessionStorage.getItem("welcomeShown")) {
        alert("Welcome to Ibhoni Bicycle Tours! 🚴‍♀️ Explore Soweto with us!");
        sessionStorage.setItem("welcomeShown", "true");
    }
});

// 2️⃣ Fade-in Elements on Scroll
const fadeElements = document.querySelectorAll('.intro-text, img, video, .btn');

fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(50px)";
    el.style.transition = "opacity 1s ease, transform 1s ease";
});

window.addEventListener('scroll', () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
});

// 3️⃣ Back-to-Top Button
const backToTop = document.createElement('button');
backToTop.innerText = "↑ Back to Top";
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) backToTop.style.display = "block";
    else backToTop.style.display = "none";
});

// 4️⃣ Button Hover Effect
const bookBtn = document.querySelector('.btn');
if (bookBtn) {
    bookBtn.addEventListener('mouseenter', () => bookBtn.innerText = "🚴 Let's Ride!");
    bookBtn.addEventListener('mouseleave', () => bookBtn.innerText = "Book your ride Now");
}