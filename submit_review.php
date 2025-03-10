<?php
// submit_review.php

// Set the header to allow JSON response
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $inputData = json_decode(file_get_contents('php://input'), true);

    if ($inputData) {
        // Validate the name length (max 13 characters)
        if (strlen($inputData['name']) > 13) {
            echo json_encode(['status' => 'error', 'message' => 'Name cannot exceed 13 characters.']);
            exit;
        }

        // Validate the review length (min 15 characters, max 64 characters)
        $reviewLength = strlen($inputData['review']);
        if ($reviewLength < 15) {
            echo json_encode(['status' => 'error', 'message' => 'Review must be at least 15 characters long.']);
            exit;
        } elseif ($reviewLength > 64) {
            echo json_encode(['status' => 'error', 'message' => 'Review cannot exceed 64 characters.']);
            exit;
        }

        // The path to the reviews file (make sure it is writable)
        $reviewsFile = './data/reviews.json';  // Path to your reviews file
        
        // Check if the reviews file exists and is not empty
        if (file_exists($reviewsFile)) {
            $existingReviews = json_decode(file_get_contents($reviewsFile), true);
        } else {
            $existingReviews = []; // If no reviews file, create an empty array
        }

        // Check if the user has already submitted a review
        foreach ($existingReviews as $review) {
            if ($review['name'] === $inputData['name']) {
                echo json_encode(['status' => 'error', 'message' => 'You can only submit one review.']);
                exit;
            }
        }

        // Check if any review was posted in the last hour
        $currentTime = time();
        $timeLimit = 3600; // 1 hour in seconds
        $canSubmit = true;

        foreach ($existingReviews as $review) {
            $lastReviewTime = strtotime($review['timestamp']);
            if ($currentTime - $lastReviewTime < $timeLimit) {
                $canSubmit = false;
                break;
            }
        }

        // If a review has been submitted within the last hour, reject new submissions
        if (!$canSubmit) {
            echo json_encode(['status' => 'error', 'message' => 'Only one review can be submitted every hour.']);
            exit;
        }

        // Add the new review data to the array
        $inputData['timestamp'] = date('Y-m-d H:i:s'); // Add timestamp to the review
        $existingReviews[] = $inputData;

        // Save the updated reviews back to the file
        if (file_put_contents($reviewsFile, json_encode($existingReviews, JSON_PRETTY_PRINT))) {
            echo json_encode(['status' => 'success', 'message' => 'Review submitted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to save review']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
