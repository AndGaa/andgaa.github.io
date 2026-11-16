// Draws the relationship lines in the skills model and handles the screenshot lightbox.

function drawModel() {
  const model = document.querySelector(".model");
  if (!model) return;
  const svg = model.querySelector(".model__links");
  const fact = model.querySelector(".table--fact");
  const dims = model.querySelectorAll(".table--dim");
  if (getComputedStyle(svg).display === "none") return;

  const box = model.getBoundingClientRect();
  const f = fact.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  svg.innerHTML = "";

  const ns = "http://www.w3.org/2000/svg";
  const label = (x, y, text) => {
    const bg = document.createElementNS(ns, "rect");
    bg.setAttribute("x", x - 7); bg.setAttribute("y", y - 9);
    bg.setAttribute("width", 14); bg.setAttribute("height", 16);
    const t = document.createElementNS(ns, "text");
    t.setAttribute("x", x); t.setAttribute("y", y + 4.5);
    t.setAttribute("text-anchor", "middle");
    t.textContent = text;
    svg.append(bg, t);
  };

  dims.forEach((dim, i) => {
    const d = dim.getBoundingClientRect();
    const left = d.left < f.left;
    const x1 = (left ? d.right : d.left) - box.left;
    const y1 = d.top + d.height / 2 - box.top;
    const x2 = (left ? f.left : f.right) - box.left;
    const y2 = f.top + f.height * (i % 2 === 0 ? 0.32 : 0.68) - box.top;
    const mid = (x1 + x2) / 2;
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", `M${x1} ${y1} H${mid} V${y2} H${x2}`);
    svg.append(path);
    label(x1 + (left ? 10 : -10), y1, "1");
    label(x2 + (left ? -10 : 10), y2, "*");
  });
}

window.addEventListener("load", drawModel);
if ("ResizeObserver" in window) {
  const model = document.querySelector(".model");
  if (model) new ResizeObserver(drawModel).observe(model);
}

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
