export function initCarousel() {
    const carousel = document.querySelector(".cards");
    let cards = document.querySelectorAll(".card");
    const totalCards = cards.length;
  
    if (totalCards === 0) {
      console.error("initCarousel: No cards found. Carousel will not initialize.");
      return;
    }
  
    let currentIndex = totalCards; // Start at last real card (fixes initial left click issue)
    const cardWidth = cards[0].offsetWidth;
  
    // **1. Clone first and last card**
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[totalCards - 1].cloneNode(true);
  
    firstClone.classList.add("clone");
    lastClone.classList.add("clone");
  
    // **2. Append clones to the carousel**
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, cards[0]);
  
    // **3. Update the cards list**
    cards = document.querySelectorAll(".card");
  
    // **4. Set the initial position to the last real card (fix)**
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  
    function moveToNext() {
      // Move to the next card
      if (currentIndex >= totalCards) {
        setTimeout(() => {
          carousel.style.transition = "none";
          currentIndex = 1; // Move to the first card (after the clone)
          carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }, 400);
      }
  
      currentIndex++;
      carousel.style.transition = "transform 0.4s ease-in-out";
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  
    function moveToPrev() {
      // Move to the previous card
      if (currentIndex <= 1) { // We're at the first real card (before the last card clone)
        setTimeout(() => {
          carousel.style.transition = "none";
          currentIndex = totalCards; // Go back to the last real card (after the clone)
          carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }, 400);
      }
  
      currentIndex--;
      carousel.style.transition = "transform 0.4s ease-in-out";
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // **5. Event Listeners**
    document.querySelector("#prev-btn").addEventListener("click", moveToPrev);
    document.querySelector("#next-btn").addEventListener("click", moveToNext);
}
