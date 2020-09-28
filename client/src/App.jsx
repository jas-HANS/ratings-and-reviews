// Importing React and Hooks
import React, { useState, useEffect } from 'react';

// Importing React-Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// Importing My Components
import ReviewTile from './components/singleReview/reviewTile';

// Importing API Request methods
import query from '../lib/routes';

const App = () => {
  const [reviews, getReviews] = useState([]); // State of reviews for current product
  // const [exists, reviewExists] = useState(true);

  useEffect(() => { // Sets the initial state of reviews
    query.searchReviews((err, data) => {
      if (err) {
        throw err;
      } else {
        const info = data.results;
        getReviews(info); // Set the reviews state to the data from the axios request
      }
    });
  }, []);

  return (
    <div>
      <Row>
        <Col xs="0" sm="2" />
        <Col xs="12" sm="8">
          <Container className="main-container">
            <h1 className="title">Ratings and Reviews</h1>
            {/* {exists || (<ReviewTile data={reviews} />)} */}
            {reviews.map((review, i) => (review ? <ReviewTile data={review} iterator={i} /> : ''))}
          </Container>
        </Col>
        <Col xs="0" sm="2" />
      </Row>
    </div>
  );
};
export default App;
