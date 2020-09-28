import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
    <Container className="review-view">
      <Col>
        <Row>
          <ReviewList reviews={seenReviews} />
        </Row>
        <Row className="more-reviews">
          <button type="button" className="more-reviews-button" onClick={() => handleChange()}>{seenReviews.length === 2 ? 'More Reviews' : 'Less Reviews'}</button>
        </Row>
      </Col>
    </Container>
  );
};

export default ReviewView;
