const btnSearch = document.getElementById("btn");
const card = document.querySelector(".card-creature");
const footer = document.querySelector("footer");
const svg = document.querySelector(".svg");
const hp = document.querySelector(".hp");
const attack = document.querySelector(".attack");
const defense = document.querySelector(".defense");
const spAttack = document.querySelector(".sp-attack");
const spDefense = document.querySelector(".sp-defense");
const speed = document.querySelector(".speed");
btnSearch.addEventListener("click", () => {
  card.style.display = "flex";
  footer.style.marginTop = "0";
  svg.style.display = "none";
  setTimeout(() => {
    hp.style.width = "30%";
    attack.style.width = "50%";
    defense.style.width = "60%";
    spAttack.style.width = "90%";
    spDefense.style.width = "100%";
    speed.style.width = "80%";
  }, 2000);
});
