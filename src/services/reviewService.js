// Review Service - Handles all review storage and retrieval using Firebase Firestore
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

const REVIEWS_COLLECTION = 'reviews';

// Get all reviews from Firestore
export const getAllReviews = async () => {
  try {
    const reviewsRef = collection(db, REVIEWS_COLLECTION);
    const querySnapshot = await getDocs(reviewsRef);

    const reviews = {
      photography: [],
      music: []
    };

    querySnapshot.forEach((doc) => {
      const reviewData = {
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to ISO string
        date: doc.data().date?.toDate?.()?.toISOString() || new Date().toISOString()
      };

      if (reviewData.category === 'photography') {
        reviews.photography.push(reviewData);
      } else if (reviewData.category === 'music') {
        reviews.music.push(reviewData);
      }
    });

    // Sort by date (newest first)
    reviews.photography.sort((a, b) => new Date(b.date) - new Date(a.date));
    reviews.music.sort((a, b) => new Date(b.date) - new Date(a.date));

    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    return { photography: [], music: [] };
  }
};

// Get reviews by category
export const getReviewsByCategory = async (category) => {
  try {
    const reviewsRef = collection(db, REVIEWS_COLLECTION);
    const q = query(
      reviewsRef,
      where('category', '==', category)
    );

    const querySnapshot = await getDocs(q);
    const reviews = [];

    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to ISO string
        date: doc.data().date?.toDate?.()?.toISOString() || new Date().toISOString()
      });
    });

    // Sort by date on client side (newest first)
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    return reviews;
  } catch (error) {
    console.error(`Error getting ${category} reviews:`, error);
    return [];
  }
};

// Add a new review
export const addReview = async (category, reviewData) => {
  try {
    const newReview = {
      name: reviewData.name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      category: category,
      date: serverTimestamp() // Use Firebase server timestamp
    };

    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), newReview);

    return {
      id: docRef.id,
      ...newReview,
      date: new Date().toISOString() // Return current date for immediate display
    };
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Get latest reviews (for homepage)
export const getLatestReviews = async (limit = 4) => {
  try {
    const allReviews = await getAllReviews();
    const combined = [
      ...allReviews.photography,
      ...allReviews.music
    ];

    // Sort by date (newest first)
    combined.sort((a, b) => new Date(b.date) - new Date(a.date));

    return combined.slice(0, limit);
  } catch (error) {
    console.error('Error getting latest reviews:', error);
    return [];
  }
};

// Get average rating for a category
export const getAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

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
