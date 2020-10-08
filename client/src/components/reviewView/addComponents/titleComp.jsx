import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const Title = ({isSubmit, callback}) => {
  const [text, changeText] = useState('');

  // useEffect(() => {
  //   callback(text);
  // }, [isSubmit]);

  return (
    <Form.Group>
      <Form.Label className="add-review-header">
        Review Title:
      </Form.Label>
      <Form.Control className="add-reviews-body" as="textarea" rows="1" placeholder="eg. Best Shoes Ever!" required onChange={(e) => callback(e.target.value)} />
      <Form.Control.Feedback type="invalid">Provide a title!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default Title;
