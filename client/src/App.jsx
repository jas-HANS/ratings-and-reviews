// Importing React and Hooks
import React from 'react';
// Importing React-Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// Importing My Components
import ReviewView from './components/reviewView/reviewView';

const App = () => {
  return (
    <div>
      <Row>
        <Col xs="0" sm="2" />
        <Col xs="12" sm="8">
          <Container className="main-container">
            <h1 className="title">Ratings and Reviews</h1>
            <Row>
              <Col xs="12" lg="3">
                Rating
              </Col>
              <Col xs="12" lg="9">
                <ReviewView />
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
