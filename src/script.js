const btnSearch = document.getElementById("btn");
const card = document.querySelector(".card-creature");
const footer = document.querySelector("footer");
const svg = document.querySelector(".svg");
btnSearch.addEventListener("click", () => {
  card.style.display = "flex";
  footer.style.marginTop = "0";
  svg.style.display = "none";
});
