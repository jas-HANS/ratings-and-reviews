// Importing React and Hooks
import React, { useState } from 'react';
// Importing React-Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// Importing My Components
import ReviewView from './components/reviewView/reviewView';
import RatingView from './components/reviewRating/ratingView';

const App = () => {
  const productId = 4;
  const [starSort, changeStarSort] = useState([]);

  const handleChangeSort = (passed) => {
    const newArr = starSort;
    if (newArr.includes(passed)) {
      newArr.splice(newArr.indexOf(passed), 1);
    } else {
      newArr.push(passed);
    }
    changeStarSort(newArr);
    console.log('starsort top', starSort); // Gets here
  };
  // // Function that takes a list of reviews, sorts it based off the starSort
  // // And returns that new list in a callback
  //     changeReviews = [];
  //     console.log('Has a sort for stars');
  //     starSort.forEach((rating) => {
  //       for (let i = 0; i < reviews.length; i += 1) {
  //         if (reviews[i].rating === rating) {
  //           changeReviews.push(reviews[i]); // Add the reviews to the new reviews list
  //         }
  //       }
  //     });

  return (
    <div>
      <Row>
        <Col xs="0" sm="2" />
        <Col xs="12" sm="8">
          <Container className="main-container">
            <h1 className="title">Ratings and Reviews</h1>
            <Row>
              <Col lg="12" xl="4">
                <RatingView id={productId} change={handleChangeSort} />
              </Col>
              <Col lg="12" xl="8">
                <ReviewView id={productId} />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs="0" sm="2" />
      </Row>
    </div>
  );
};

export default App;
