import { generateStars } from "./utils.js";

// Load reviews from JSON file
export async function loadReviews() {
  const jsFile = "./data/reviews.json";
  try {
    const response = await fetch(jsFile);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reviews = await response.json();

    // Sort reviews by popularity in descending order
    reviews.sort((a, b) => b.popularity - a.popularity); // Sorting in-place

    // Load reviews only with 5 stars
    const filteredReviews = reviews.filter((review) => review.rating === 5);

        // DEBUG
        console.log("Reviews:", filteredReviews); // Debugging purposes: display all reviews in console

    // Select container to load reviews
    const reviewContainer = document.getElementById("reviews-container");

    // Iterate through filtered reviews and create HTML elements for each review
    filteredReviews.slice(0, 3).forEach((review) => {
      const reviewElement = document.createElement("div");
      const stars = generateStars(review.rating);
      reviewElement.classList.add("review");
      reviewElement.innerHTML = `
        <div class="author">${review.name}</div>
        <div class="rating">Rating: ${stars}</div>
        <div class="comment">${review.review}</div>
        <div class="popularity">+${review.popularity}</div>
        <div class="date">${review.timestamp}</div>
      `;
      reviewContainer.appendChild(reviewElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}