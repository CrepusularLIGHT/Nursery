// Function to handle form submission
function submitReview() {
  const nameInput = document.getElementById("name");
  const reviewInput = document.getElementById("reviewText");
  const ratingInput = document.getElementById("rating");

  // Validate username length
  if (nameInput.value.length > 13) {
    alert("Username cannot be longer than 13 characters.");
    return; // Prevent form submission
  }

  // Validate review length
  if (reviewInput.value.length < 15) {
    alert("Review must be at least 15 characters long.");
    return; // Prevent form submission
  }

  if (reviewInput.value.length > 64) {
    alert("Review cannot be longer than 64 characters.");
    return; // Prevent form submission
  }

  // Prepare the review data to send
  const reviewData = {
    name: nameInput.value,
    review: reviewInput.value,
    rating: parseInt(ratingInput.value, 10),
    popularity: 0,
  };

  // Disable the submit button immediately after submission to prevent further submissions
  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  // Send the review data to the server
  fetch("submit_review.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Review submitted successfully!");
        document.getElementById("reviewForm").reset();

        // Optionally, you could store the time of submission in localStorage or cookies
        localStorage.setItem("lastReviewTime", Date.now());

        // Disable the button for 1 hour
        setTimeout(() => {
          submitButton.disabled = false; // Re-enable the button after 1 hour
        }, 3600000); // 1 hour = 3600000 ms
      } else {
        alert("Error: " + data.message);
        submitButton.disabled = false; // Re-enable the button if there was an error
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was an issue submitting your review.");
      submitButton.disabled = false; // Re-enable the button if there's an error
    });
}

// Function to restrict invalid characters while typing in the input fields
function restrictInput(event, allowedChars) {
  const char = String.fromCharCode(event.which || event.keyCode);
  if (!allowedChars.test(char)) {
    event.preventDefault();
  }
}

// Function to handle the input restrictions for both username and review
function applyInputRestrictions() {
  // Define regex for valid characters

  // Only allow A-Z, a-z, 0-9, underscores (_), hyphens (-), and periods (.)
  const usernameValidChars = /^[a-zA-Z0-9_.-]*$/; // GMOD username allowed characters

  const reviewValidChars = /^[a-zA-Z0-9\s,.()-<!?':%;$@]*$/; // Letters, numbers, and specific symbols

  // Apply input restrictions to username
  document
    .getElementById("name")
    .addEventListener("keypress", function (event) {
      restrictInput(event, usernameValidChars);
    });

  // Apply input restrictions to review
  document
    .getElementById("reviewText")
    .addEventListener("keypress", function (event) {
      restrictInput(event, reviewValidChars);
    });
}

// Attach the submitReview function to the form submit event
document
  .getElementById("reviewForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    submitReview(); // Call the function to handle the submission
  });

// Apply input restrictions on page load
document.addEventListener("DOMContentLoaded", function () {
  applyInputRestrictions();
});
