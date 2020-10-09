import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const Recommend = ({ isSubmit, callback}) => {
  return (
    <Form.Group>
      <Form.Label className="add-review-header" style={{ paddingRight: "10px" }}>
        Would you recommend this product?
      </Form.Label>
      <Form.Check required className="add-reviews-body" inline name="radio-yes-no" type="radio" label="Yes" onClick={() => callback(true)} />
      <Form.Check required className="add-reviews-body" inline name="radio-yes-no" type="radio" label="No" onClick={() => callback(false)} />
      <Form.Control.Feedback type="invalid">Required *</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Recommend;
