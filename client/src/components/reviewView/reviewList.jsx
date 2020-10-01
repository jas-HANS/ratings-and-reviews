import React from 'react';
import PropTypes from 'prop-types';

import ReviewTile from '../singleReview/reviewTile';

const ReviewList = ({ reviews, help, change, report }) => {
  // Define a seenReviews variable to keep track of the reviews that the view is showing
  // Set this to be the first two in reviews on the first load
  // OnClick of a more reviews button, show more reviews
  return (
    <div className="review-container">
      <div className="review-list">
        {reviews.map((review) => (review ? <ReviewTile data={review} help={help} change={change} report={report} /> : ''))}
      </div>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  help: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  report: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ReviewList;
