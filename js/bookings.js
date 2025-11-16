document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const packageSelect = document.querySelector("#package");
  const guestInput = document.querySelector("#guests");
  const dateInput = document.querySelector("#date");

  // ----- PRICE LIST -----
  const packagePrices = {
    standard: 600,
    meal_beer: 700,
    two_for_one: 600,   // price for 2 people
    group_voucher: 650  // price for 2 people
  };

  // Create dynamic price display
  const priceDisplay = document.createElement("p");
  priceDisplay.style.fontWeight = "bold";
  priceDisplay.style.fontSize = "18px";
  priceDisplay.style.marginTop = "10px";
  packageSelect.insertAdjacentElement("afterend", priceDisplay);

  // ====== DISABLE PAST DATES ======
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  // ====== LIVE AVAILABILITY CHECKER ======
  function checkAvailability(selectedDate) {
    const date = new Date(selectedDate);
    const day = date.getDay(); // 0 = Sunday, 1 = Monday...

    // RULE 1: Closed every Monday
    if (day === 1) {
      return { available: false, message: "❌ Fully booked on Mondays." };
    }

    // RULE 2: Closed during holidays (24–26 Dec)
    const month = date.getMonth();  // 11 = December
    const dayOfMonth = date.getDate();

    if (month === 11 && dayOfMonth >= 24 && dayOfMonth <= 26) {
      return { available: false, message: "❌ Closed for holidays (Dec 24–26)." };
    }

    return { available: true, message: "✅ Date is available!" };
  }

  const availabilityMsg = document.createElement("p");
  availabilityMsg.style.fontWeight = "bold";
  availabilityMsg.style.marginTop = "5px";
  dateInput.insertAdjacentElement("afterend", availabilityMsg);

  dateInput.addEventListener("change", () => {
    if (!dateInput.value) return;

    const result = checkAvailability(dateInput.value);

    availabilityMsg.textContent = result.message;
    availabilityMsg.style.color = result.available ? "green" : "red";

    if (!result.available) {
      dateInput.value = "";
    }
  });

  // ====== PRICE CALCULATOR ======
  function calculatePrice() {
    const pkg = packageSelect.value;
    const guests = parseInt(guestInput.value);

    if (!pkg || !guests) {
      priceDisplay.textContent = "";
      return;
    }

    let total = 0;

    if (pkg === "two_for_one" || pkg === "group_voucher") {
      // Deals priced per 2 people
      total = packagePrices[pkg] * Math.ceil(guests / 2);
    } else {
      total = packagePrices[pkg] * guests;
    }

    priceDisplay.textContent = `💰 Estimated Total: R${total}`;
  }

  packageSelect.addEventListener("change", calculatePrice);
  guestInput.addEventListener("input", calculatePrice);

  // ====== FORM SUBMISSION ======
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const pkg = packageSelect.value;
    const date = dateInput.value;
    const guests = guestInput.value;

    if (!name || !email || !phone || !pkg || !date || guests < 1) {
      alert("⚠ Please complete all fields correctly before submitting.");
      return;
    }

    // Validate availability again before submission
    const availability = checkAvailability(date);
    if (!availability.available) {
      alert("⚠ The selected date is unavailable. Please choose another.");
      return;
    }

    // Save to localStorage
    const booking = {
      name,
      email,
      phone,
      package: pkg,
      date,
      guests,
      requests: document.querySelector("#requests").value.trim()
    };

    localStorage.setItem("ibhoniBooking", JSON.stringify(booking));

    alert(
      "🎉 Booking Confirmed!\n\n" +
      "Thank you, " + name + ".\n" +
      "We will send a confirmation email to: " + email
    );

    form.reset();
    priceDisplay.textContent = "";
    availabilityMsg.textContent = "";
  });
});

// Smooth scroll for Book Now buttons
document.querySelectorAll('.bttn').forEach(btn => {
  btn.addEventListener('click', function (event) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
