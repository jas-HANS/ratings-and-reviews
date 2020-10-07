import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import StarRatings from 'react-star-ratings';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import query from '../../../lib/routes';
import Characteristic from './formCharacteristics';

const AddReview = ({ id }) => {
  const [isShown, changeShown] = useState(false);
  const [characteristics, changeChars] = useState([]);
  const [rate, setRating] = useState(0);
  const [ratingMeaning, setMeaning] = useState('');

  useEffect(() => {
    const starMeaning = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
    setMeaning(starMeaning[rate - 1]); // Set the meaning to be one less than the rating
    // This is because there is no 0 star rating and no 6 star rating so the
    // 1 star will show the 0 index
  }, [rate]);

  useEffect(() => {
    query.getCharacteristics(id, (err, data) => {
      if (err) {
        throw err;
      } else {
        changeChars(Object.keys(data));
      }
    });
  }, []);

  return (
    <div>
      <button type="button" className="add-reviews" onClick={() => changeShown(true)}>Add a Review</button>
      <Modal dialogClassName="add-reviews-modal" show={isShown} onHide={() => changeShown(false)} size="xl">
        {/* Forms */}
        <Form className="add-reviews-form">
          <h1 className="add-review-title">Add Review</h1>
          <Container>
            <Row>
              <Col xs="7">
                <Form.Group>
                  <Form.Label className="add-review-header" style={{ paddingRight: "10px" }}>
                    Overall Rating:
                  </Form.Label>
                  <StarRatings
                    rating={rate}
                    starRatedColor="#F5B895"
                    starHoverColor="#F5B895"
                    starEmptyColor="#F1EEE6"
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="1px"
                    changeRating={(rating) => setRating(rating)}
                    />
                  <span style={{ paddingLeft: '10px' }} className="add-reviews-body">{ratingMeaning}</span>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="add-review-header" style={{ paddingRight: "10px" }}>
                    Would you recommend this product?
                  </Form.Label>
                  <Form.Check className="add-reviews-body" inline name="radio-yes-no" type="radio" label="Yes" />
                  <Form.Check className="add-reviews-body" inline name="radio-yes-no" type="radio" label="No" />
                </Form.Group>
                {characteristics ? characteristics.map((char) => (
                  <Characteristic key={uuidv4()} characteristic={char} />
                )) : ''}
              </Col>
              <Col xs="5">
                <Form.Group>
                  <Form.Label className="add-review-header">
                    Review Title:
                  </Form.Label>
                  <Form.Control className="add-reviews-body" as="textarea" rows="1" placeholder="eg. Best Shoes Ever!" required />
                  <Form.Control.Feedback>Provide at least 60 chars!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="add-review-header">
                    Review Summary:
                  </Form.Label>
                  <Form.Control className="add-reviews-body" as="textarea" rows="4" placeholder="Tell us more!" required />
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="add-review-header">
                        Nickname:
                      </Form.Label>
                      <Form.Control className="add-reviews-body" type="text" placeholder="Example: jackson11!" required />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="add-review-header">
                        Email Address:
                      </Form.Label>
                      <Form.Control className="add-reviews-body" type="email" placeholder="jackson11@email.com" required />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.File>
                  <Form.File.Label className="add-review-header">
                    Upload an Image!
                  </Form.File.Label>
                  <Form.File.Input className="add-reviews-body" />
                </Form.File>
                <button type="submit" className="add-review-button">Add Review!</button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal>
    </div>
  );
};

AddReview.propTypes = {
  id: PropTypes.number.isRequired,
};

export default AddReview;
