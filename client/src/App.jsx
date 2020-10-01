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
    console.log(starSort); // Gets here
  };
  useEffect(() => {
    console.log('change'); // Does not get here
  }, [starSort]);
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
                <ReviewView id={productId} starSort={starSort} />
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
