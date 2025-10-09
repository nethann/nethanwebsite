// Review Service - Handles all review storage and retrieval
const REVIEWS_KEY = 'nethan_reviews';

// Initialize reviews structure
const initializeReviews = () => {
  const existingReviews = localStorage.getItem(REVIEWS_KEY);
  if (!existingReviews) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify({
      photography: [],
      music: []
    }));
  }
};

// Get all reviews
export const getAllReviews = () => {
  initializeReviews();
  const reviews = localStorage.getItem(REVIEWS_KEY);
  return JSON.parse(reviews);
};

// Get reviews by category
export const getReviewsByCategory = (category) => {
  const allReviews = getAllReviews();
  return allReviews[category] || [];
};

// Add a new review
export const addReview = (category, reviewData) => {
  const allReviews = getAllReviews();

  const newReview = {
    id: Date.now(),
    name: reviewData.name,
    rating: reviewData.rating,
    comment: reviewData.comment,
    date: new Date().toISOString(),
    category: category
  };

  allReviews[category].unshift(newReview); // Add to beginning
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));

  return newReview;
};

// Get latest reviews (for homepage)
export const getLatestReviews = (limit = 4) => {
  const allReviews = getAllReviews();
  const combined = [
    ...allReviews.photography.map(r => ({ ...r, category: 'photography' })),
    ...allReviews.music.map(r => ({ ...r, category: 'music' }))
  ];

  // Sort by date (newest first)
  combined.sort((a, b) => new Date(b.date) - new Date(a.date));

  return combined.slice(0, limit);
};

// Get average rating for a category
export const getAverageRating = (category) => {
  const reviews = getReviewsByCategory(category);
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};
