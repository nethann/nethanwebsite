import React from 'react';
import { FaStar } from 'react-icons/fa';
import { formatDate } from '../../services/reviewService';
import '../../CSS/Global/ReviewDisplay.css';

export default function ReviewDisplay({ reviews, category, onAddReviewClick }) {
  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return (
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    );
  };

  const averageRating = getAverageRating();

  return (
    <section className="reviews-section" data-aos="fade-up">
      <div className="reviews-header">
        <div className="reviews-header-content">
          <h2>Reviews</h2>
          {reviews.length > 0 && (
            <div className="average-rating">
              <span className="rating-number">{averageRating}</span>
              <div className="rating-stars">{renderStars(Math.round(averageRating))}</div>
              <span className="review-count">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
            </div>
          )}
        </div>
        <button className="add-review-button" onClick={onAddReviewClick}>
          + Leave a Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews yet. Be the first to share your experience!</p>
          <button className="add-review-button-large" onClick={onAddReviewClick}>
            Write the First Review
          </button>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card" data-aos="fade-up">
              <div className="review-card-header">
                <div className="review-author-info">
                  <div className="review-avatar">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="review-author-details">
                    <h4 className="review-author-name">{review.name}</h4>
                    <span className="review-date">{formatDate(review.date)}</span>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
