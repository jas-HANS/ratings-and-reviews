import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import query from '../../../lib/routes';

import ReviewList from './reviewList';

const ReviewView = () => {
  const [reviews, getReviews] = useState([]); // State of reviews for current product
  const [seenReviews, changeSeenReviews] = useState([]);

  useEffect(() => { // Sets the initial state of reviews
    query.searchReviews((err, data) => {
      if (err) {
        throw err;
      } else {
        const info = data.results;
        getReviews(info); // Set the reviews state to the data from the axios request
        changeSeenReviews(info.slice(0, 2));
      }
    });
  }, []);

  const handleChange = () => {
    if (seenReviews.length === 2) {
      changeSeenReviews(reviews);
    } else {
      changeSeenReviews(reviews.slice(0, 2));
    }
  };

  return (
    <div className="review-view">
      <ReviewList reviews={seenReviews} />
      <Button onClick={() => handleChange()}>{seenReviews.length === 2 ? 'More Reviews' : 'Less Reviews'}</Button>
    </div>
  );
};

export default ReviewView;
