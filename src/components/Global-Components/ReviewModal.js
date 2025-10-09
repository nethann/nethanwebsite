import React, { useState, useEffect } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import { addReview } from '../../services/reviewService';
import '../../CSS/Global/ReviewModal.css';

export default function ReviewModal({ isOpen, onClose, category }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens and check if user can submit
  useEffect(() => {
    if (isOpen) {
      setName('');
      setRating(0);
      setHoverRating(0);
      setComment('');
      setErrors({});

      // Check if user has already submitted a review for this category recently
      const lastReviewKey = `lastReview_${category}`;
      const lastReviewTime = localStorage.getItem(lastReviewKey);

      if (lastReviewTime) {
        const hoursSinceLastReview = (Date.now() - parseInt(lastReviewTime)) / (1000 * 60 * 60);

        // Allow only 1 review per 24 hours per category
        if (hoursSinceLastReview < 24) {
          const hoursRemaining = Math.ceil(24 - hoursSinceLastReview);
          setErrors({
            submit: `You can only submit one review per day. Please wait ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} before submitting another review.`
          });
        }
      }
    }
  }, [isOpen, category]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!comment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user can submit (rate limit check)
    const lastReviewKey = `lastReview_${category}`;
    const lastReviewTime = localStorage.getItem(lastReviewKey);

    if (lastReviewTime) {
      const hoursSinceLastReview = (Date.now() - parseInt(lastReviewTime)) / (1000 * 60 * 60);

      if (hoursSinceLastReview < 24) {
        const hoursRemaining = Math.ceil(24 - hoursSinceLastReview);
        setErrors({
          submit: `You can only submit one review per day. Please wait ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} before submitting another review.`
        });
        return;
      }
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Add review to Firestore
      const newReview = await addReview(category, {
        name: name.trim(),
        rating,
        comment: comment.trim()
      });

      // Record the time of this review submission
      localStorage.setItem(lastReviewKey, Date.now().toString());

      // Show success notification in Dynamic Island
      if (window.showDynamicIslandNotification) {
        window.showDynamicIslandNotification('success', 'Review submitted! Thank you!');
      }

      // Close modal and refresh page after short delay
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to show new review
      }, 800);

    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="review-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="review-modal-header">
          <h2>Leave a Review</h2>
          <p className="review-category-label">
            {category === 'photography' ? '📸 Photography' : '🎵 Music'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={errors.name ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Star Rating */}
          <div className="form-group">
            <label>Rating *</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star ${
                    star <= (hoverRating || rating) ? 'filled' : ''
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>

          {/* Comment Textarea */}
          <div className="form-group">
            <label htmlFor="comment">Your Review *</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share your experience with Nethan's ${category}...`}
              rows="5"
              className={errors.comment ? 'error' : ''}
              disabled={isSubmitting}
            />
            <span className="character-count">
              {comment.length} characters
            </span>
            {errors.comment && <span className="error-message">{errors.comment}</span>}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="review-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
