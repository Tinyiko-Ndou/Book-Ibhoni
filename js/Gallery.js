// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".image-gallery img");

  // Create a modal container
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" id="modal-img">
    <div id="caption"></div>
  `;
  document.body.appendChild(modal);

  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  // When any image is clicked
  images.forEach(img => {
    img.addEventListener("click", (e) => {
      e.preventDefault(); // prevent link opening
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerText = img.alt;
    });
  });

  // Close modal when X is clicked
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
