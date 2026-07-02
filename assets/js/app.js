const ingredients = [
  { id: "Onion", emoji: "🧅" },
  { id: "Potato", emoji: "🥔" },
  { id: "Tomato", emoji: "🍅" },
  { id: "Cheese", emoji: "🧀" },
  { id: "Beef", emoji: "🥩" },
  { id: "Chicken", emoji: "🍗" },
  { id: "Flour", emoji: "🌾" },
  { id: "Egg", emoji: "🥚" }
];

const inventory = {};
const grid = document.getElementById("ingredientGrid");

// Grid dynamisch aufbauen
ingredients.forEach((item) => {
  inventory[item.id] = {
    normal: 0,
    delicious: 0,
  };

  grid.innerHTML += `
    <div class="card">
      <h3>${item.emoji} ${item.id}</h3>
      <div class="counterRow">
        <span>Normal</span>
        <div class="counter">
          <button onclick="change('${item.id}','normal',-1)">−</button>
          <div class="value" id="${item.id}_normal">0</div>
          <button onclick="change('${item.id}','normal',1)">+</button>
        </div>
      </div>
      <div class="counterRow">
        <span>Delicious</span>
        <div class="counter">
          <button onclick="change('${item.id}','delicious',-1)">−</button>
          <div class="value" id="${item.id}_delicious">0</div>
          <button onclick="change('${item.id}','delicious',1)">+</button>
        </div>
      </div>
    </div>
  `;
});

// WICHTIG: Über window verfügbar machen, damit onclick im HTML greift!
window.change = function(ingredient, quality, amount) {
  inventory[ingredient][quality] += amount;

  if (inventory[ingredient][quality] < 0) {
    inventory[ingredient][quality] = 0;
  }

  document.getElementById(ingredient + "_" + quality).textContent =
    inventory[ingredient][quality];
};

// Reset Button Logik
document.getElementById("resetButton").onclick = () => {
  ingredients.forEach((item) => {
    inventory[item.id].normal = 0;
    inventory[item.id].delicious = 0;

    document.getElementById(item.id + "_normal").textContent = 0;
    document.getElementById(item.id + "_delicious").textContent = 0;
  });
};

// Tab-Wechsel-Logik
const invTab = document.getElementById("inventoryTab");
const resTab = document.getElementById("resultsTab");
const invPage = document.getElementById("inventoryPage");
const resPage = document.getElementById("resultsPage");

invTab.onclick = () => {
  invTab.classList.add("active");
  invPage.classList.add("active");
  resTab.classList.remove("active");
  resPage.classList.remove("active");
};

resTab.onclick = () => {
  resTab.classList.add("active");
  resPage.classList.add("active");
  invTab.classList.remove("active");
  invPage.classList.remove("active");
};