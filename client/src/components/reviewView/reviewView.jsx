import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import query from '../../../lib/routes';
import ReviewList from './reviewList';

const ReviewView = () => {
  const [reviews, getReviews] = useState([]); // State of reviews for current product
  const [count, countUpdate] = useState(2);
  const [atEnd, updateEnd] = useState(false);
  const [button, changeButton] = useState('');

  useEffect(() => { // Sets the initial state of reviews
    query.searchReviews(count + 1, (err, data) => {
      if (err) {
        throw err;
      } else {
        const info = data.results.slice(0, data.results.length - 1);
        getReviews(info); // Set the reviews state to the data from the axios request
        if (data.results[count] === undefined) {
          updateEnd(true);
        }
      }
    });
  }, [count]);

  useEffect(() => {
    const handleChange = () => {
      if (atEnd) {
        countUpdate(2);
        updateEnd(false);
      } else {
        countUpdate(count + 2);
      }
    };
    if (atEnd) { // Show less reviews button
      changeButton(<button type="button" className="more-reviews-button" onClick={() => handleChange()}>Less Reviews</button>);
    } else {
      changeButton(<button type="button" className="more-reviews-button" onClick={() => handleChange()}>More Reviews</button>);
    }
  }, [atEnd, reviews]);

  return (
    <Container className="review-view">
      <Col>
        <Row>
          <ReviewList reviews={reviews} />
        </Row>
        <Row className="more-reviews">
          {button}
        </Row>
      </Col>
    </Container>
  );
};

export default ReviewView;
