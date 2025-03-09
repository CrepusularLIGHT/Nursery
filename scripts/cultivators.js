const cultivatorsPerPage = 8;
const ranks = [
  { min: 0, max: 25000, name: "🌱" },
  { min: 25000, max: 50000, name: "🌿" },
  { min: 50000, max: 75000, name: "🌳" },
  { min: 75000, max: 100000, name: "🌼" },
  { min: 100000, max: 150000, name: "👨‍🌾" },
  { min: 150000, max: 200000, name: "🌾" },
  { min: 200000, max: 250000, name: "🏡" },
  { min: 250000, max: 300000, name: "🏆" },
  { min: 300000, max: 400000, name: "🎖️" },
  { min: 400000, max: 500000, name: "💰" },
  { min: 500000, max: Infinity, name: "🔥" },
];
let currentIndex = 0;
let cultivatorsDataGlobal = [];
let isExpanded = false;

export async function loadCultivators() {
  try {
    const response = await fetch("./data/cultivators.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    cultivatorsDataGlobal = await response.json();
    renderCultivators(true); // Ensure starts collapsed
  } catch (error) {
    console.error("Error fetching cultivators:", error);
  }
}

export function renderCultivators(initialLoad = false) {
  const cultivatorContainer = document.querySelector("#top-earners");
  const loadMoreText = document.querySelector("#moreCultivators");

  if (initialLoad) {
    isExpanded = false; // Ensure it starts collapsed
  } else {
    isExpanded = !isExpanded; // Toggle state when button is clicked
  }

  cultivatorContainer.innerHTML = ""; // Clear before updating

  if (isExpanded) {
    // Show full list
    cultivatorsDataGlobal.forEach((user, index) => {
      const rank = getRank(user.Profit);
      const formattedProfit = new Intl.NumberFormat("en-US").format(user.Profit);
      
      const cultivatorElement = document.createElement("li");
      cultivatorElement.classList.add("earners");
      cultivatorElement.innerHTML = `
          <span class="position">#${index + 1}</span>
          <span class="username"><span class="rank">${rank}</span>${user.Player}</span>
          <span class="profit">+\$${formattedProfit}</span>
      `;
      cultivatorContainer.appendChild(cultivatorElement);
    });

    loadMoreText.textContent = "Hide More Cultivators"; // Change text
  } else {
    // Show only first batch (first 8)
    const nextBatch = cultivatorsDataGlobal.slice(0, cultivatorsPerPage);
    nextBatch.forEach((user, index) => {
      const rank = getRank(user.Profit);
      const formattedProfit = new Intl.NumberFormat("en-US").format(user.Profit);
      
      const cultivatorElement = document.createElement("li");
      cultivatorElement.classList.add("earners");
      cultivatorElement.innerHTML = `
          <span class="position">#${index + 1}</span>
          <span class="username"><span class="rank">${rank}</span>${user.Player}</span>
          <span class="profit">+\$${formattedProfit}</span>
      `;
      cultivatorContainer.appendChild(cultivatorElement);
    });

    loadMoreText.textContent = "See More Cultivators"; // Change text
  }
}

// Function to get the rank based on profit
function getRank(profit) {
  return (
    ranks.find((rank) => profit >= rank.min && profit < rank.max)?.name || "❓"
  );
}
