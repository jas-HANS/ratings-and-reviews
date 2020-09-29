import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import query from '../../../lib/routes';
import ReviewList from './reviewList';
import Sort from './dropdownSort';

const ReviewView = () => {
  const [reviews, getReviews] = useState([]); // State of reviews for current product
  const [seenReviews, changeSeen] = useState([]); // State of reviews shown on the page
  const [sort, changeSort] = useState('relevance');

  const [helpfulIds, changeHelpfulIds] = useState([]);

  useEffect(() => { // Sets the initial state of reviews and seenReviews
    const id = 4;
    query.getRatingTotals(id, (error, ratings) => {
      if (error) {
        throw error;
      } else {
        // Here do the math to calculate how many total reviews there are.
        let total = 0;
        const values = Object.values(ratings);
        values.forEach((value) => { total += value; });
        query.searchReviews(sort, id, total, (err, data) => { // Get the reviews with that total
          if (err) {
            throw err;
          } else {
            getReviews(data.results); // Set the reviews state to the data from the axios request
            let info;
            if (seenReviews.length === 0) {
              info = data.results.slice(0, 2);
            } else {
              info = data.results.slice(0, seenReviews.length);
            }
            changeSeen(info); // Set the initial seen reviews to be only two of the reviews
          }
        });
      }
    });
  }, [sort]);

  // Handle the changing of the dropdown menu
  const handleDropdownChange = (passedThing) => {
    changeSort(passedThing);
  };

  const handleHelpfulAdd = (newId) => {
    const newArr = helpfulIds;
    newArr.push(newId);
    changeHelpfulIds(newArr);
  };

  return (
    <Container className="review-view">
      <Sort func={handleDropdownChange} currentSort={sort} reviews={reviews} />
      <Col>
        <Row>
          <ReviewList reviews={seenReviews} help={helpfulIds} change={handleHelpfulAdd} />
        </Row>
        <Row className="more-reviews">
          {reviews.length === seenReviews.length
            ? <button type="button" className="more-reviews-button" onClick={() => changeSeen(reviews.slice(0, 2))}>Less Reviews</button>
            : <button type="button" className="more-reviews-button" onClick={() => changeSeen(reviews.slice(0, seenReviews.length + 2))}>More Reviews</button> }
        </Row>
      </Col>
    </Container>
  );
};

export default ReviewView;

// TALK OVER
// - Should the reviews be rendered per click or once and then loaded out two at a time
// -- Currently the questions are rendered by counting up and adding two to the count requested
// -- Alternatively, request for the max and increase per every click by showing in pairs of two over the total array
