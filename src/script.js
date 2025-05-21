// Button to trigger the search functionality. This button listens for click events
// and initiates the process of fetching and displaying creature data based on user input.
const btnSearch = document.getElementById("btn");

// Card element to display creature details. This card is dynamically updated
// with information such as the creature's name, stats, types, and image.
const card = document.querySelector(".card-creature");

// Footer element, dynamically adjusted based on search results. The footer's
// margin is modified to ensure proper spacing and alignment of elements.
const footer = document.querySelector("footer");

// SVG element shown during loading. This element provides a visual indicator
// to the user that the application is fetching data from the API.
const svg = document.querySelector(".svg");

// Input field for entering the creature name or ID. The user can type either
// the name or the numeric ID of the creature they want to search for.
const input = document.getElementById("search-input");

// Elements to display creature details. These elements are updated dynamically
// with the fetched data, including the creature's name, skills, stats, and more.
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

// Store original content of height and weight elements for resetting. These
// variables are used to restore the default state of the UI when a new search
// is initiated or the interface is reset.
const originalHeightContent = heightCreature.innerHTML;
const originalWeightContent = weightCreature.innerHTML;

// Base API URL for fetching creature data. This URL serves as the endpoint
// for retrieving a list of creatures or details about a specific creature.
const apiList = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";

// Variable to store the API URL for a specific creature. This URL is constructed
// dynamically based on the user's input (name or ID) and is used to fetch data.
let apiCreature = null;

/**
 * Updates the skill section with the creature's special skill data.
 * This function extracts the skill name and description from the provided
 * data object and updates the corresponding UI elements.
 *
 * @param {Object} data - The creature data containing skill information.
 * @param {Object} data.special - The special skill data of the creature.
 * @param {string} data.special.name - The name of the special skill.
 * @param {string} data.special.description - The description of the special skill.
 */
const dataSkill = (data) => {
  const { special } = data; // Extract special skill data
  const { name, description } = special; // Extract skill name and description
  nameSkill.textContent = name; // Update skill name in the UI
  decripSkill.textContent = description; // Update skill description in the UI
};

/**
 * Populates the UI with the creature's data, including stats, types, and other details.
 * This function dynamically updates various sections of the UI with the fetched
 * creature data, such as its name, ID, stats, types, height, weight, and image.
 *
 * @param {Object} data - The creature data fetched from the API.
 * @param {Array} data.stats - An array of stats objects, each containing a name and base_stat.
 * @param {Array} data.types - An array of type objects, each containing a name.
 * @param {number} data.weight - The weight of the creature in decagrams.
 * @param {number} data.height - The height of the creature in decimeters.
 * @param {number} data.id - The unique ID of the creature.
 * @param {string} data.name - The name of the creature.
 */
const creatureData = (data) => {
  const { stats, types, weight, height, id, name } = data;
  img.src = `./assets/${name}.png`;

  // Dynamically set the image source based on the creature's name.
  // The image is expected to be located in the public/assets directory.

  // Append height and weight details to their respective elements.
  // The height is converted from decimeters to meters, and the weight
  // is converted from decagrams to kilograms for better readability.
  heightCreature.innerHTML += `<p>${height / 10} m</p>`;
  weightCreature.innerHTML += `<p>${weight / 10} kg</p>`;

  // Update the creature's name and ID in the UI.
  // The ID is formatted with a leading zero for consistency.
  creatureName.textContent = name;
  creatureId.textContent = `#0${id}`;
  dataSkill(data);

  // Populate the stats section with bars representing each stat.
  // Each bar's width is dynamically adjusted based on the stat value.

  statsCreature.innerHTML += stats
    .map((item) => {
      const { name, base_stat } = item;
      return `
      <div class="bars">
        <div class="statss">
          <div class="text-stats">
            <p>${name}</p>
            <p class="number-stat">${base_stat}</p>
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

  // Adjust the width of the stat bars after a delay to ensure proper rendering.
  setTimeout(() => {
    stats.forEach((stat) => {
      const bar = document.querySelector(`.${stat.name}`);
      if (stat.base_stat > 100) stat.base_stat -= stat.base_stat % 100; // Normalize stat values
      if (bar) bar.style.width = `${stat.base_stat}%`; // Set bar width
    });
  }, 1300);

  // Populate the types section with the creature's types.
  // Each type is displayed as a styled div with the type name in uppercase.
  textType.innerHTML += types
    .map((type) => {
      const { name } = type;
      return `
      <div class="type-creature ${name}" id="types">
          <p>${name.toUpperCase()}</p>
      </div>
    `;
    })
    .join("");
};

/**
 * Prepares the UI for a new search by resetting elements and showing the loading state.
 * This function hides the card, resets the footer margin, displays the loading SVG,
 * and clears dynamic content to prepare the interface for a new search.
 */
const searchCreature = () => {
  card.style.display = "none"; // Hide the card initially
  footer.style.marginTop = ""; // Reset footer margin
  svg.style.display = "block"; // Show loading SVG
  searchText.style.display = "block"; // Show search text
  img.src = "https://placehold.co/1024x1536";

  // Reset dynamic content
  textType.innerHTML = "";
  statsCreature.innerHTML = "";
  creatureName.textContent = "";
  creatureId.textContent = "";
  statsCreature.innerHTML = "";
  heightCreature.innerHTML = originalHeightContent;
  weightCreature.innerHTML = originalWeightContent;

  // Construct the API URL based on the input value
  apiCreature = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${input.value}`;
};

/**
 * Resets the UI to its initial state.
 * This function hides the card, resets the footer margin, displays the loading SVG,
 * and clears dynamic content to restore the interface to its default state.
 */
const reset = () => {
  input.value = "";
  card.style.display = "none";
  footer.style.marginTop = "";
  svg.style.display = "block";
  searchText.style.display = "block";

  // Reset dynamic content
  textType.innerHTML = "";
  statsCreature.innerHTML = "";
  creatureName.textContent = "";
  creatureId.textContent = "";
  statsCreature.innerHTML = "";
  heightCreature.innerHTML = originalHeightContent;
  weightCreature.innerHTML = originalWeightContent;
};

/**
 * Fetches creature data from the API and updates the UI with the results.
 * Displays an alert if the creature is not found.
 * This function handles the entire process of fetching data, updating the UI,
 * and handling errors in case the creature is not found.
 */
const search = async () => {
  try {
    searchCreature(); // Prepare the UI for the search
    const res = await fetch(apiCreature); // Fetch data from the API
    const data = await res.json(); // Parse the response JSON
    card.style.display = "flex"; // Show the card with creature details
    footer.style.marginTop = "0"; // Adjust footer margin
    svg.style.display = "none"; // Hide loading SVG
    searchText.style.display = "none"; // Hide search text
    creatureData(data); // Populate the UI with the fetched data
    input.value = ""; // Clear the input field
  } catch (err) {
    reset();
    alert("Creature not found"); // Show an error alert if the creature is not found
    return false;
  }
};

// Add event listener to the search button
btnSearch.addEventListener("click", search);

// Add event listener to the input field for handling Enter and Ctrl+Enter keys
input.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    reset(); // Reset the UI if Ctrl+Enter is pressed
    return;
  }
  if (e.key === "Enter") search(); // Trigger search if Enter is pressed
});
