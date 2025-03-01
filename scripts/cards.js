export async function loadCards() {
  const jsFile = "./data/cards.json";
  try {
    const response = await fetch(jsFile);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderCards(data);
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
}

function renderCards(cardsData) {
  const cardContainer = document.querySelector(".card-container .cards");

  if (!cardContainer) {
    console.error("Error: Card container not found.");
    return; // Stop execution if container is missing
  }

  cardsData.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardTitle = document.createElement("h4");
    cardTitle.textContent = card.title;

    const cardText = document.createElement("p");
    cardText.innerHTML = card.text;

    if (card.class) {
      cardText.classList.add(...card.class.split(' '));
    }

    if (card.color) {
      const cardColor = '#' + card.color;
      const darkColor = darkenColor(cardColor, 20);
      cardElement.style.backgroundColor = cardColor;
      cardTitle.style.backgroundColor = darkColor;
    }

    // Append the title and text to the card element
    cardElement.appendChild(cardTitle);
    cardElement.appendChild(cardText);

    cardContainer.appendChild(cardElement);
  });
}

// Function to convert HEX to HSL
function hexToHSL(hex) {
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
      h = s = 0; // Achromatic
  } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

// Function to create a darker version of a color
function darkenColor(hex, amount) {
  let hsl = hexToHSL(hex);
  hsl.l = Math.max(0, hsl.l - amount); // Reduce lightness
  return `hsl(${hsl.h.toFixed(0)}, ${hsl.s.toFixed(0)}%, ${hsl.l.toFixed(0)}%)`;
}