
document.addEventListener("DOMContentLoaded", function() {


  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    section.addEventListener("mouseenter", () => {
      section.style.backgroundColor = "#e0f7fa"; // light teal on hover
      section.style.transition = "background-color 0.3s ease";
    });
    section.addEventListener("mouseleave", () => {
      section.style.backgroundColor = "whitesmoke"; // revert back
    });
  });


  const navLinks = document.querySelectorAll("nav a[href^='#']");
  
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  const discountSection = document.querySelector("section:first-of-type");
  

  const discountDiv = document.createElement("div");
  discountDiv.style.textAlign = "center";
  discountDiv.style.marginTop = "15px";

  discountDiv.innerHTML = `
    <label for="numPeople">Enter number of people: </label>
    <input type="number" id="numPeople" min="1" value="1" style="width:60px;">
    <br><br>
    <label><input type="checkbox" id="donateBook"> Donating a book for 10% discount</label>
    <br><br>
    <button id="calcPrice">Calculate Total</button>
    <p id="totalPrice" style="font-weight:bold; margin-top:10px;"></p>
  `;

  discountSection.appendChild(discountDiv);

  document.getElementById("calcPrice").addEventListener("click", () => {
    const numPeople = parseInt(document.getElementById("numPeople").value);
    const donate = document.getElementById("donateBook").checked;
    let pricePerPerson = 600;
    let total = pricePerPerson * numPeople;

    if (donate) {
      total *= 0.9; // apply 10% discount
    }

    document.getElementById("totalPrice").textContent = 
      `Total Price: R ${total.toFixed(2)} (${donate ? "Discount Applied" : "No Discount"})`;
  });

  // ===== Optional: Feedback when social icons are clicked =====
  const socialIcons = document.querySelectorAll(".social-icons a");
  socialIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      alert("You are about to visit: " + icon.href);
    });
  });

});
