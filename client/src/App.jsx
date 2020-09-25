import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import ReviewTile from './components/reviewTile';
import getReviews from '../lib/routes';

const App = () => {
  let info;
  getReviews((err, data) => {
    if (err) {
      throw err;
    } else {
      info = data.results;
      console.log(info);
    }
  });

  return (
    <div>
      <Row>
        <Col xs="0" sm="2" />
        <Col xs="12" sm="8">
          <Container className="main-container">
            <h1 className="title">Ratings and Reviews</h1>
            <Jumbotron>
              <ReviewTile data={info} />
            </Jumbotron>
          </Container>
        </Col>
        <Col xs="0" sm="2" />
      </Row>
    </div>
  );
};

export default App;
