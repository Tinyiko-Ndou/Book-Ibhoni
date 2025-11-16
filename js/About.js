// Fade in the page when loaded
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        document.body.style.transition = "opacity 1.5s";
        document.body.style.opacity = "1";
    }, 100);

    // Display dynamic greeting message
    const greeting = document.createElement("h2");
    greeting.style.textAlign = "center";
    greeting.style.color = "white";

    const hour = new Date().getHours();
    let message = "";

    if (hour < 12) {
        message = "Good Morning! Welcome to Ibhoni Bicycle Tours 🚴‍♂️";
    } else if (hour < 18) {
        message = "Good Afternoon! Enjoy learning about us 🌞";
    } else {
        message = "Good Evening! Thanks for visiting 🌙";
    }

    greeting.textContent = message;

    const main = document.querySelector("main");
    main.insertBefore(greeting, main.firstChild);

    // Highlight today's operating hours
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = new Date().getDay() - 1; 
    // Sunday = 0, so shift by -1

    const paragraphs = document.querySelectorAll("main p");

    paragraphs.forEach(p => {
        if (p.textContent.startsWith(days[today])) {
            p.style.fontWeight = "bold";
            p.style.color = "#FFD700";
        }
    });

    // Social icon hover effect
    const icons = document.querySelectorAll(".social-icons i");
    icons.forEach(icon => {
        icon.style.transition = "transform .3s, color .3s";

        icon.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.3)";
            icon.style.color = "#FFD700";
        });

        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1)";
            icon.style.color = "";
        });
    });
});
