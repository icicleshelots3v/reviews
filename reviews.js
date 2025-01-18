// Script to display dynamic reviews with a natural distribution

// Generate the distribution of reviews
function generateReviewDistribution(totalReviews) {
    const reviewCounts = {
        5: Math.floor(totalReviews * 0.75), // 75% Five stars
        4: Math.floor(totalReviews * 0.15), // 15% Four stars
        3: Math.floor(totalReviews * 0.05), // 5% Three stars
        2: Math.floor(totalReviews * 0.03), // 3% Two stars
        1: Math.floor(totalReviews * 0.02)  // 2% One star
    };

    // Adjust totals to match the exact number of reviews
    const actualTotal = Object.values(reviewCounts).reduce((a, b) => a + b, 0);
    reviewCounts[5] += totalReviews - actualTotal;

    return reviewCounts;
}

// Generate a single review
function generateReview(rating) {
    const sampleReviews = {
        5: [
            "Absolutely amazing! Best lube I've ever used!",
            "Pure luxury in a jar. Love it!",
            "Perfect for every occasion. Highly recommend!",
        ],
        4: [
            "Great product, just a bit pricey.",
            "Works really well, but the jar is small.",
            "Very satisfied, but shipping took a while."
        ],
        3: [
            "It's okay, but not what I expected.",
            "Decent, but I prefer other brands.",
            "The texture was not to my liking."
        ],
        2: [
            "Not impressed, unfortunately.",
            "It didn’t work as I hoped.",
            "Arrived damaged and leaking."
        ],
        1: [
            "Terrible experience, wouldn’t buy again.",
            "Not worth the hype.",
            "Disappointed with the quality."
        ]
    };

    const reviewText = sampleReviews[rating][Math.floor(Math.random() * sampleReviews[rating].length)];
    return { rating, text: reviewText };
}

// Generate all reviews
function generateReviews(totalReviews) {
    const distribution = generateReviewDistribution(totalReviews);
    const reviews = [];

    Object.keys(distribution).forEach(star => {
        for (let i = 0; i < distribution[star]; i++) {
            reviews.push(generateReview(parseInt(star)));
        }
    });

    // Shuffle the reviews for a natural appearance
    for (let i = reviews.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
    }

    return reviews;
}

// Display the reviews on the webpage
function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';

        // Create stars
        const stars = document.createElement('div');
        stars.className = 'stars';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = i < review.rating ? 'star filled' : 'star';
            stars.appendChild(star);
        }

        // Add text
        const text = document.createElement('p');
        text.className = 'review-text';
        text.textContent = review.text;

        // Append to review element
        reviewElement.appendChild(stars);
        reviewElement.appendChild(text);

        // Append to container
        reviewsContainer.appendChild(reviewElement);
    });
}

// Generate and display 2733 reviews
document.addEventListener('DOMContentLoaded', () => {
    const totalReviews = 2733;
    const reviews = generateReviews(totalReviews);
    displayReviews(reviews);
});

/* CSS for styling reviews (add to your CSS file)

.review {
    margin: 10px 0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.stars {
    display: flex;
    margin-bottom: 5px;
}
.star {
    width: 20px;
    height: 20px;
    background: url('star-outline.svg') no-repeat center center / contain;
}
.star.filled {
    background: url('star-filled.svg') no-repeat center center / contain;
}
.review-text {
    font-size: 14px;
    color: #555;
}
*/
