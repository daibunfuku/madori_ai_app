console.log("script.js 読み込まれてます");

let selectedPattern = "random";

const patternButtons = document.querySelectorAll(".patternBtn");

patternButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("クリック:", btn.dataset.type);

    patternButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    selectedPattern = btn.dataset.type;
  });
});
