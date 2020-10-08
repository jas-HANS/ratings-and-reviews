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
import FormCharacteristics from './formChars';

const AddReview = ({ id }) => {
  const [isShown, changeShown] = useState(false);
  const [charArr, changeCharArr] = useState([]);
  const [charData, changeCharData] = useState([]);
  const [ratingMeaning, setMeaning] = useState('');
  const [isValid, changeIsValid] = useState(false);
  const [isInvalid, changeIsInvalid] = useState(false);

  const [rate, setRating] = useState(0);
  const [bodyText, changeBodyText] = useState('');
  const [titleText, changeTitleText] = useState('');
  const [nickname, changeNickname] = useState('');
  const [email, changeEmail] = useState('');
  const [recommend, changeRec] = useState('');
  const [chars, changeCharacteristics] = useState({});

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    // Handle the change of changeCharacteristics to the individual data
    // from each characteristic list
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const reviewObject = {
        rating: rate,
        summary: titleText,
        body: bodyText,
        recommend: recommend,
        name: nickname,
        email: email,
        characteristics: {},
        photos: [''],
      };
      if (isValid) {
        // Handle the post of a review section here
        query.postNewReview(id, reviewObject, (err) => {
          if (err) {
            throw err;
          } else {
            changeShown(false);
            // Add in logic to allow for re-render of the page/
            console.log('Success!');
          }
        });
      } else { // If the body element is not valid up to 60 chars
        console.log('Not Valid');
      }
    }
    setValidated(true);
  };

  const handleChangeChar = (identity, info) => {
    const newObj = { ...chars };
    newObj[identity] = info;
    // changeCharacteristics(newObj);
  };

  // useEffect(() => {
  //   const starMeaning = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  //   setMeaning(starMeaning[rate - 1]); // Set the meaning to be one less than the rating
  //   // This is because there is no 0 star rating and no 6 star rating so the
  //   // 1 star will show the 0 index
  // }, [rate]);

  useEffect(() => {
    query.getCharacteristics(id, (err, data) => {
      if (err) {
        throw err;
      } else {
        changeCharArr(Object.keys(data));
        changeCharData(data);
      }
    });
  }, [id]);

  useEffect(() => {
    if (bodyText.length !== 0) {
      if (bodyText.length < 60) {
        changeIsValid(false);
        changeIsInvalid(true);
      } else {
        changeIsInvalid(false);
        changeIsValid(true);
      }
    } else {
      changeIsInvalid(false);
      changeIsValid(false);
    }
  }, [bodyText]);

  return (
    <div>
      <button type="button" className="add-reviews" onClick={() => changeShown(true)}>Add a Review</button>
      <Modal dialogClassName="add-reviews-modal" show={isShown} size="xl" onHide={() => alert('Click the X button to exit this window')}>
        {/* Forms */}
        <Form className="add-reviews-form" noValidate validated={validated} onSubmit={handleSubmit}>
          <button type="button" className="close-add-reviews" onClick={() => changeShown(false)}>X</button>
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
                  <Form.Check required className="add-reviews-body" inline name="radio-yes-no" type="radio" label="Yes" onClick={() => changeRec(true)} />
                  <Form.Check required className="add-reviews-body" inline name="radio-yes-no" type="radio" label="No" onClick={() => changeRec(false)} />
                  <Form.Control.Feedback type="invalid">Required *</Form.Control.Feedback>
                </Form.Group>
                <FormCharacteristics characteristics={charArr} data={charData} change={handleChangeChar} />
              </Col>
              <Col xs="5">
                <Form.Group>
                  <Form.Label className="add-review-header">
                    Review Title:
                  </Form.Label>
                  <Form.Control className="add-reviews-body" as="textarea" rows="1" placeholder="eg. Best Shoes Ever!" required onChange={(e) => changeTitleText(e.target.value)} />
                  <Form.Control.Feedback type="invalid">Provide a title!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="add-review-header">
                    Review Body:
                  </Form.Label>
                  <Form.Control isValid={isValid} isInvalid={isInvalid} className="add-reviews-body" as="textarea" rows="4" placeholder="Tell us more!" required onChange={(e) => changeBodyText(e.target.value)} />
                  <Form.Control.Feedback type="invalid">Provide at least 60 characters!</Form.Control.Feedback>
                  {isValid ? <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback> : ''}
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="add-review-header">
                        Nickname:
                      </Form.Label>
                      <Form.Control className="add-reviews-body" type="text" placeholder="Example: jackson11!" required onChange={(e) => changeNickname(e.target.value)} />
                      <Form.Control.Feedback type="invalid">* Required</Form.Control.Feedback>
                      <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="add-review-header">
                        Email Address:
                      </Form.Label>
                      <Form.Control className="add-reviews-body" type="email" placeholder="jackson11@email.com" required onChange={(e) => changeEmail(e.target.value)} />
                      <Form.Control.Feedback type="invalid">* Required</Form.Control.Feedback>
                      <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
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
