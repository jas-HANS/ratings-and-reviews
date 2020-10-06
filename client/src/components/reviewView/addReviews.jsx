import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import StarRatings from 'react-star-ratings';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddReview = () => {
  const [isShown, changeShown] = useState(false);
  const [rate, setRating] = useState(0);
  return (
    <div>
      <button type="button" className="add-reviews" onClick={() => changeShown(true)}>Add a Review</button>
      <Modal show={isShown} onHide={() => changeShown(false)}>
        <h1>Add Review</h1>
        {/* Forms */}
        <Form>
          <Form.Group>
            <Form.Label>
              Overall Rating:
            </Form.Label>
            <StarRatings
              rating={rate}
              starRatedColor="#F5B895"
              starHoverColor="#F5B895"
              starEmptyColor="#B5C7D3"
              numberOfStars={5}
              starDimension="30px"
              starSpacing="1px"
              changeRating={(rating) => setRating(rating)}
            />
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
};

export default AddReview;
