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
  const productId = 200;
  const [starSort, changeStarSort] = useState([]);

  const handleChangeSort = (passed) => {
    if (starSort.includes(passed)) {
      const newArr = [...starSort];
      newArr.splice(newArr.indexOf(passed), 1);
      changeStarSort(newArr);
    } else {
      changeStarSort(starSort.concat(passed));
    }
  };

  const handleRemoveSort = () => {
    changeStarSort([]);
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
                <RatingView id={productId} change={handleChangeSort} sort={starSort} remove={handleRemoveSort} />
              </Col>
              <Col lg="12" xl="8">
                <ReviewView id={productId} starSortArray={starSort} />
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
