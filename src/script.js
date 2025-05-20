const btnSearch = document.getElementById("btn");
const card = document.querySelector(".card-creature");
const footer = document.querySelector("footer");
btnSearch.addEventListener("click", () => {
  card.style.display = "flex";
  footer.style.marginTop = "0";
});
