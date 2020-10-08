import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const Body = ({ callback, isValid, isInvalid }) => {
  // useEffect(() => {
  //   callback(body);
  // }, [isSubmit]);

  return (
    <Form.Group>
      <Form.Label className="add-review-header">
        Review Body:
      </Form.Label>
      <Form.Control isValid={isValid} isInvalid={isInvalid} className="add-reviews-body" as="textarea" rows="5" placeholder="Tell us more!" required onChange={(e) => callback(e.target.value)} />
      <Form.Control.Feedback type="invalid">Provide at least 60 characters!</Form.Control.Feedback>
      {isValid ? <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback> : ''}
    </Form.Group>
  );
};

export default Body;
