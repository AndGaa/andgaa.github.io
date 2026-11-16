// Opens screenshots in a lightbox on the project pages.
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const img = lightbox.querySelector("img");
  document.querySelectorAll(".figure button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.querySelector("img");
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      lightbox.showModal();
    });
  });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
}
