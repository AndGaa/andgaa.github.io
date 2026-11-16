// Moves the highlight between the strength cards, and opens screenshots in a lightbox.
const strengths = document.querySelectorAll(".strength");
strengths.forEach((card) => {
  const activate = () => strengths.forEach((c) => c.classList.toggle("is-active", c === card));
  card.addEventListener("mouseenter", activate);
  card.addEventListener("focusin", activate);
});

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
