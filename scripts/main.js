import { loadCultivators } from "./cultivators.js";
import { loadCards } from "./cards.js";
import { loadReviews } from "./reviews.js";
import { initCarousel } from "./carousel.js";
import { loadMembers } from "./members.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadCultivators();
    await loadCards();
    await loadReviews();
    await loadMembers();
    
    if (cards.length > 0) {
        initCarousel();
    } else {
        console.error("No cards found! Check if loadCards() is correctly adding them.");
    }
})