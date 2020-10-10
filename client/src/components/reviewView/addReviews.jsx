import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import query from '../../../lib/routes';
import FormCharacteristics from './formChars';
import Stars from './addComponents/starComp';
import Recommend from './addComponents/recComp';
import Title from './addComponents/titleComp';
import Body from './addComponents/bodyComp';

const AddReview = ({ id }) => {
  const [isShown, changeShown] = useState(false);
  const [charArr, changeCharArr] = useState([]);
  const [charData, changeCharData] = useState([]);

  const [rate, changeRate] = useState(0);
  const [bodyText, changeBodyText] = useState('');
  const [titleText, changeTitleText] = useState('');
  const [nickname, changeNickname] = useState('');
  const [email, changeEmail] = useState('');
  const [recommend, changeRec] = useState('');
  const [chars, changeCharacteristics] = useState({});
  const [images, changeImages] = useState({});

  const [validated, setValidated] = useState(false);

  const [isValid, changeIsValid] = useState(false);
  const [isInvalid, changeIsInvalid] = useState(false);

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
        characteristics: chars,
        photos: [images],
      };
      if (isValid) {
        // Handle the post of a review section here
        query.postNewReview(id, reviewObject, (err) => {
          if (err) {
            throw err;
          } else {
            // Add in logic to allow for re-render of the page
            changeShown(false);
            window.location.reload();
            console.log('Success!');
          }
        });
      } else { // If the body element is not valid up to 60 chars
        console.log('Not Valid');
      }
    }
    setValidated(true);
  };

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
                <Stars callback={changeRate} />
                <Recommend callback={changeRec} />
                <FormCharacteristics characteristics={charArr} data={charData} change={changeCharacteristics} />
              </Col>
              <Col xs="5">
                <Title callback={changeTitleText} />
                <Body callback={changeBodyText} isValid={isValid} isInvalid={isInvalid} />
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
                  <Form.File.Input className="add-reviews-body" onChange={(e) => changeImages(URL.createObjectURL(e.target.files[0]))} />
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
