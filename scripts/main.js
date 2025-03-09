import { loadCultivators, renderCultivators } from "./cultivators.js";
import { loadCards } from "./cards.js";
import { loadReviews } from "./reviews.js";
import { initCarousel } from "./carousel.js";
import { loadMembers } from "./members.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadCultivators();
  await loadCards();
  await loadReviews();
  await loadMembers();

  const cards = document.querySelectorAll(".card");
  if (cards.length > 0) {
    initCarousel();
  } else {
    console.error(
      "No cards found! Check if loadCards() is correctly adding them."
    );
  }

  // Attach event listener for "Load More" button
  const loadMoreText = document.querySelector("#moreCultivators");
  if (loadMoreText) {
    loadMoreText.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent scrolling
      renderCultivators(); // Toggle visibility
    });
  } else {
    console.warn('Element "#moreCultivators" was not found in the DOM.');
  }
});
