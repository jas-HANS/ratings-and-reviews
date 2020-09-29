import React from 'react';
import PropTypes from 'prop-types';

import ReviewTile from '../singleReview/reviewTile';

const ReviewList = ({ reviews }) => {
  // Define a seenReviews variable to keep track of the reviews that the view is showing
  // Set this to be the first two in reviews on the first load
  // OnClick of a more reviews button, show more reviews
  return (
    <div className="review-container">
      <div className="review-list">
        {reviews.map((review) => (review ? <ReviewTile data={review} /> : ''))}
      </div>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ReviewList;
