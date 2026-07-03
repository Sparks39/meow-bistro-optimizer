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

const recipes = [
  { id: "Veggie Sandwich", emoji: "🥪", baseGold: 20, requires: { Onion: 1, Potato: 1 } },
  { id: "Tomato Stew",     emoji: "🍲", baseGold: 26, requires: { Onion: 1, Tomato: 1 } },
  { id: "Hamburger",       emoji: "🍔", baseGold: 42, requires: { Onion: 1, Beef: 1 } },
  { id: "Empanada",        emoji: "🥟", baseGold: 36, requires: { Onion: 1, Chicken: 1 } },
  { id: "Egg Sandwich",    emoji: "🥪", baseGold: 30, requires: { Onion: 1, Egg: 1 } },
  { id: "Veggie Pizza",    emoji: "🍕", baseGold: 36, requires: { Onion: 1, Cheese: 1 } },
  { id: "Onion Soup",      emoji: "🥣", baseGold: 24, requires: { Onion: 1, Flour: 1 } },
  { id: "Veggie Curry",    emoji: "🍛", baseGold: 20, requires: { Potato: 1, Tomato: 1 } },
  { id: "Tostada",         emoji: "🌮", baseGold: 42, requires: { Potato: 1, Beef: 1 } },
  { id: "Chicken Stew",    emoji: "🍲", baseGold: 48, requires: { Potato: 1, Chicken: 1 } },
  { id: "Potato Salad",    emoji: "🥗", baseGold: 30, requires: { Potato: 1, Egg: 1 } },
  { id: "Potato Pizza",    emoji: "🍕", baseGold: 36, requires: { Potato: 1, Cheese: 1 } },
  { id: "Potato Soup",     emoji: "🥣", baseGold: 24, requires: { Potato: 1, Flour: 1 } },
  { id: "Beef Taco",       emoji: "🌮", baseGold: 36, requires: { Tomato: 1, Beef: 1 } },
  { id: "Chicken Curry",   emoji: "🍛", baseGold: 48, requires: { Tomato: 1, Chicken: 1 } },
  { id: "Eggs in Hell",    emoji: "🍳", baseGold: 36, requires: { Tomato: 1, Egg: 1 } },
  { id: "Tomato Pizza",    emoji: "🍕", baseGold: 30, requires: { Tomato: 1, Cheese: 1 } },
  { id: "Tomato Pasta",    emoji: "🍝", baseGold: 24, requires: { Tomato: 1, Flour: 1 } },
  { id: "Egg Pizza",       emoji: "🍕", baseGold: 46, requires: { Egg: 1, Cheese: 1 } },
  { id: "Pancake",         emoji: "🥞", baseGold: 34, requires: { Egg: 1, Flour: 1 } },
  { id: "Cheese Pizza",    emoji: "🍕", baseGold: 40, requires: { Cheese: 1, Flour: 1 } },
  { id: "Giant Meatball",  emoji: "🧆", baseGold: 70, requires: { Chicken: 1, Beef: 1 } },
  { id: "Beef Stew",       emoji: "🍲", baseGold: 58, requires: { Egg: 1, Beef: 1 } },
  { id: "Meat Pizza",      emoji: "🍕", baseGold: 52, requires: { Beef: 1, Cheese: 1 } },
  { id: "Beef Wellington", emoji: "🥩", baseGold: 58, requires: { Beef: 1, Flour: 1 } },
  { id: "Chicken Nugget",  emoji: "🍗", baseGold: 46, requires: { Chicken: 1, Egg: 1 } },
  { id: "Chicken Soup",    emoji: "🥣", baseGold: 46, requires: { Chicken: 1, Cheese: 1 } },
  { id: "Fried Chicken",   emoji: "🍗", baseGold: 52, requires: { Chicken: 1, Flour: 1 } }
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

// Per Klick ändern
window.change = function(ingredient, quality, amount) {
  inventory[ingredient][quality] += amount;

  if (inventory[ingredient][quality] < 0) {
    inventory[ingredient][quality] = 0;
  }

  document.getElementById(ingredient + "_" + quality).textContent = inventory[ingredient][quality];
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

function foodGradeToGold(recipe, usedQualities) {
  let bonusGold = 0;
  const requiredIngredients = Object.keys(recipe.requires);

  requiredIngredients.forEach((ingredientName) => {
    if (usedQualities && usedQualities[ingredientName] === "delicious") {
      bonusGold += 2;
    }
  });

  return recipe.baseGold + bonusGold;
}

function hasIngredients(recipe, currentInv) {
  return Object.keys(recipe.requires).every(ingredientName => {
    const benoetigteMenge = recipe.requires[ingredientName];
    const vorhandeneMenge = currentInv[ingredientName].normal + currentInv[ingredientName].delicious;
    
    return vorhandeneMenge >= benoetigteMenge;
  });
}

const sortedRecipes = [...recipes].sort((a, b) => b.baseGold - a.baseGold);

function getBestGold(recipeIndex, currentInv) {
  if (recipeIndex >= sortedRecipes.length) {
    return { gold: 0, crafts: [] };
  }

  let recipe = sortedRecipes[recipeIndex];

  // Pfad A: Rezept überspringen
  let resultWithout = getBestGold(recipeIndex + 1, currentInv);

  // Pfad B: Rezept kochen
  let resultWith = { gold: 0, crafts: [] };
  if (hasIngredients(recipe, currentInv)) {
    const usedQualities = removeIngredients(recipe, currentInv);
    let currentRecipeGold = foodGradeToGold(recipe, usedQualities);

    // Zählen, wie viele "delicious" Zutaten für das Rezept benutzt wurden
    let deliciousCount = 0;
    Object.keys(recipe.requires).forEach(ing => {
      if (usedQualities[ing] === "delicious") {
        deliciousCount++;
      }
    });

    // Bestimme das Label anhand der verbrauchten Delicious-Menge
    let gradeLabel = "Normal";
    if (deliciousCount === 1) gradeLabel = "Delicious";
    if (deliciousCount === 2) gradeLabel = "Very Delicious";

    // Weiter auf demselben Index kochen
    let nextResult = getBestGold(recipeIndex, currentInv);
    
    resultWith.gold = currentRecipeGold + nextResult.gold;
    
    // Wir hängen das Rezept samt seiner errechneten Qualitätsstufe an
    resultWith.crafts = [{ 
      id: recipe.id, 
      emoji: recipe.emoji, 
      gold: currentRecipeGold,
      grade: gradeLabel 
    }, ...nextResult.crafts];
    
    addIngredients(currentInv, recipe, usedQualities);
  }

  // Der mathematisch bessere Pfad gewinnt
  if (resultWith.gold > resultWithout.gold) {
    return resultWith;
  } else {
    return resultWithout;
  }
}

function removeIngredients(recipe, currentInv) {
  const usedQualities = {};

  Object.keys(recipe.requires).forEach(ingredientName => {
    const requiredAmount = recipe.requires[ingredientName];

    if (currentInv[ingredientName].delicious >= requiredAmount) {
      currentInv[ingredientName].delicious -= requiredAmount;
      usedQualities[ingredientName] = "delicious";
    } else {
      currentInv[ingredientName].normal -= requiredAmount;
      usedQualities[ingredientName] = "normal";
    }
  });

  return usedQualities;
}

function addIngredients(currentInv, recipe, usedQualities) {
  Object.keys(recipe.requires).forEach(ingredientName => {
    const requiredAmount = recipe.requires[ingredientName];
    const quality = usedQualities[ingredientName];

    currentInv[ingredientName][quality] += requiredAmount;
  });
}

function calculateOptimalRecipes() {
  let invClone = JSON.parse(JSON.stringify(inventory));
  
  // Holt das Ergebnis-Objekt ab
  let result = getBestGold(0, invClone);

  // Komprimiert die einzelnen Kochschritte in eine Zusammenfassung (Name + Qualitätsstufe)
  let summary = {};
  result.crafts.forEach(craft => {
    let uniqueKey = `${craft.id}_${craft.grade}`;
    
    if (!summary[uniqueKey]) {
      summary[uniqueKey] = { 
        name: craft.id, 
        grade: craft.grade, 
        count: 0, 
        emoji: craft.emoji, 
        totalGold: 0 
      };
    }
    summary[uniqueKey].count++;
    summary[uniqueKey].totalGold += craft.gold;
  });

  // Generiert das HTML für die Liste der gekochten Rezepte mit farbigen Labels
  let recipesHtml = "";
  Object.keys(summary).forEach(key => {
    let item = summary[key];
    
    let labelColor = "#95a5a6"; // Grau für Normal
    if (item.grade === "Delicious") labelColor = "#f39c12"; // Orange
    if (item.grade === "Very Delicious") labelColor = "#e84393"; // Pink

    recipesHtml += `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #edf2f7; font-size: 1.1em;">
        <div>
          <strong>${item.count}x</strong> ${item.emoji} ${item.name}
          <span style="font-size: 0.75em; padding: 2px 6px; border-radius: 4px; color: white; background-color: ${labelColor}; margin-left: 5px; font-weight: bold;">
            ${item.grade}
          </span>
        </div>
        <div style="color: #27ae60; font-weight: bold;">+${item.totalGold} Gold</div>
      </div>
    `;
  });

  if (recipesHtml === "") {
    recipesHtml = `<p style="text-align: center; color: #7f8c8d; margin-top: 15px;">Keine Zutaten vorhanden oder keine Rezepte kochbar.</p>`;
  }

  const resultsPage = document.getElementById("resultsPage");
  if (resultsPage) {
    resultsPage.innerHTML = `
      <div class="resultCard">
        <h2>Results</h2>
        <div style="text-align: center; font-size: 26px; font-weight: bold; color: #27ae60; margin: 15px 0;">
          💰 Total Gold: ${result.gold}
        </div>
        
        <div style="background: #f8fafc; border-radius: 8px; padding: 10px; margin-top: 15px; text-align: left;">
          <h3 style="margin-top: 0; color: #475569; font-size: 1em; text-transform: uppercase; letter-spacing: 0.5px;">To Craft:</h3>
          ${recipesHtml}
        </div>
        
        <p style="text-align: center; color: #7f8c8d; font-size: 0.85em; margin-top: 15px;">Your ingredients have been mathematically optimized!</p>
      </div>
    `;
  }

  resTab.click();
}

document.getElementById("calculateButton").onclick = calculateOptimalRecipes;