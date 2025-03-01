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

export async function loadCultivators() {
    const jsFile = "./data/cultivators.json";
    try {
        const response = await fetch(jsFile);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cultivators = await response.json();
        renderCultivators(cultivators);
    } catch (error) {
        console.error("Error fetching cultivators:", error);
    }
}

function renderCultivators(cultivatorsData) {
    const cultivatorContainer = document.querySelector("#top-earners");
    var userPosition = 1;

    cultivatorsData.forEach((user) => {
        const rank = getRank(user.profit);
        const cultivatorElement = document.createElement("li");
        cultivatorElement.classList.add("earners");
        cultivatorElement.innerHTML = `
            <span class="position">#${userPosition}</span>
            <span class="username"><span class="rank">${rank}</span>${user.username}</span>
            <span class="profit">+\$${user.profit}</span>
        `;
        cultivatorContainer.appendChild(cultivatorElement);
        userPosition++;
    })
}

// Function to get the rank based on profit
function getRank(profit) {
    return ranks.find(rank => profit >= rank.min && profit < rank.max).name;
  }