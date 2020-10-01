// Importing React and Hooks
import React, { useEffect, useState } from 'react';
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

  const handleChangeSort = (passed, kind) => {
    const newArr = starSort;
    if (kind === 'remove') {
      newArr.splice(newArr.indexOf(passed), 1);
    } else {
      newArr.push(passed);
    }
    changeStarSort(newArr);
    console.log('starsort top', starSort); // Gets here
  };
  // Function that takes a list of reviews, sorts it based off the starSort
  // And returns that new list in a callback
  const handleSortTheReviews = (reviews, callback) => {
    let changeReviews = [];
    if (!starSort[0]) {
      // Keep our sorted array the same
      console.log('no sort for stars');
      changeReviews = reviews;
    } else {
      // Sort the reviews by only the rating in the starSort array
      changeReviews = [];
      console.log('Has a sort for stars');
      starSort.forEach((rating) => {
        for (let i = 0; i < reviews.length; i += 1) {
          if (reviews[i].rating === rating) {
            changeReviews.push(reviews[i]); // Add the reviews to the new reviews list
          }
        }
      });
    }
    callback(changeReviews);
  };

  return (
    <div>
      <Row>
        <Col xs="0" sm="2" />
        <Col xs="12" sm="8">
          <Container className="main-container">
            <h1 className="title">Ratings and Reviews</h1>
            <Row>
              <Col lg="12" xl="4">
                <RatingView id={productId} changeSort={handleChangeSort} />
              </Col>
              <Col lg="12" xl="8">
                <ReviewView id={productId} changeReviews={handleSortTheReviews} />
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
