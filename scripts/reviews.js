import { generateStars } from "./utils.js";

//  LOAD REVIEWS FROM JSON FILE
// Fetch json file and display top 3 reviews with 5
export async function loadReviews() {
  const jsFile = "./data/reviews.json";
  try {
    const response = await fetch(jsFile);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reviews = await response.json();

    // Load reviews only with 5 stars
    const filteredReviews = reviews.filter((review) => review.rating === 5);

    // Select container to load reviews
    const reviewContainer = document.getElementById("reviews-container");

    // Iterate through filtered reviews and create HTML elements for each review
    filteredReviews.slice(0, 3).forEach((review) => {
      const reviewElement = document.createElement("div");
      const stars = generateStars(review.rating);
      reviewElement.classList.add("review");
      reviewElement.innerHTML = `
        <div class="author">${review.author}</div>
        <div class="rating">Rating: ${stars}</div>
        <div class="comment">${review.comment}</div>
        <div class="popularity">+${review.popularity}</div>
        <div class="date">${review.date}</div>
      `;
      reviewContainer.appendChild(reviewElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}