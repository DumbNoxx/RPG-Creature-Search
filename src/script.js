const btnSearch = document.getElementById("btn");
const card = document.querySelector(".card-creature");
const footer = document.querySelector("footer");
const svg = document.querySelector(".svg");
const input = document.getElementById("search-input");
const creatureName = document.getElementById("creature-name");
const nameSkill = document.getElementById("name-skill");
const decripSkill = document.getElementById("description-skill");
const statsCreature = document.getElementById("stats-creature");
const img = document.getElementById("image-creature");
const heightCreature = document.getElementById("height");
const weightCreature = document.getElementById("weight");
const textType = document.getElementById("text-type");
const creatureId = document.getElementById("creature-id");
const searchText = document.querySelector(".search-text");

const apiList = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
let apiCreature = null;

const creatureData = (data) => {
  const { special, stats, types, weight, height, id } = data;
  heightCreature.innerHTML += `
  <p>${height / 10} m</p>
  `;
  weightCreature.innerHTML += `
  <p>${weight / 10} kg</p>
  `;
  const { name, description } = special;
  nameSkill.textContent = name;
  decripSkill.textContent = description;
  creatureId.textContent = `#0${id}`;
  statsCreature.innerHTML += stats
    .map((item) => {
      const { name, base_stat } = item;
      return `
      <div class="bars">
        <div class="statss">
          <div class="text-stats">
            <p>${name}</p>
              <p>${base_stat}</p>
                  </div>
                  <div class="bar">
                    <div class="${name}" id="${name}"></div>
                  </div>
                </div>
                </div>
              </div>
    `;
    })
    .join("");

  setTimeout(() => {
    stats.forEach((stat) => {
      const bar = document.querySelector(`.${stat.name}`);
      if (stat.base_stat > 100) stat.base_stat -= stat.base_stat % 100;
      if (bar) bar.style.width = `${stat.base_stat}%`;
    });
  }, 2000);

  textType.innerHTML += types
    .map((type) => {
      const { name } = type;
      return `
      <div class="type-creature ${name}" id="types">
          <p>${name}</p>
      </div>
    `;
    })
    .join("");
};

const searchCreature = () => {
  apiCreature = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${input.value}`;
  img.src = `../public/assets/${input.value}.png`;
  creatureName.textContent = input.value;
};

const search = async () => {
  try {
    searchCreature();
    const res = await fetch(apiCreature);
    const data = await res.json();
    creatureData(data);
  } catch (err) {}
};

btnSearch.addEventListener("click", () => {
  card.style.display = "flex";
  footer.style.marginTop = "0";
  svg.style.display = "none";
  searchText.style.display = "none";
  search();
});
