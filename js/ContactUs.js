document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const messageBox = document.getElementById("formMessage");

    const modal = document.getElementById("successModal");
    const closeBtn = document.querySelector(".close-btn");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            messageBox.style.color = "yellow";
            messageBox.innerText = "Please fill in all required fields.";
            return;
        }

        // Show modal
        modal.style.display = "block";

        // Reset form
        form.reset();
        messageBox.innerText = "";
    });

    // Close modal
    closeBtn.onclick = () => modal.style.display = "none";

    // Click outside to close
    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = "none";
    };
});
