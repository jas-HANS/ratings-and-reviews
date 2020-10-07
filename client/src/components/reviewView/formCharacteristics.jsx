import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const Characteristic = ({ characteristic }) => {
  const [currentStats, changeStats] = useState([]);

  useEffect(() => {
    if (characteristic === 'Fit') {
      changeStats(['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']);
    } else if (characteristic === 'Length') {
      changeStats(['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']);
    } else if (characteristic === 'Quality') {
      changeStats(['Poor', 'Below Average', 'What I expected', 'Pretty Great', 'Perfect']);
    } else if (characteristic === 'Comfort') {
      changeStats(['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']);
    } else if (characteristic === 'Width') {
      changeStats(['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']);
    } else if (characteristic === 'Size') {
      changeStats(['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big']);
    }
  }, []);
  return (
    <Form.Group style={{ padding: '0px', fontSize: '15px' }}>
      <Form.Row style={{ justifyContent: 'left', fontSize: '20px' }}>
        <Form.Label className="add-review-header" style={{ padding: "2px" }}>{`${characteristic}:`}</Form.Label>
      </Form.Row>
      <Form.Check inline required className="add-reviews-body" feedback="Please select an option!" name={`form-check-${characteristic}`} type="radio" label={currentStats[0]} />
      <Form.Check inline required className="add-reviews-body" feedback="Please select an option!" name={`form-check-${characteristic}`} type="radio" label={currentStats[1]} />
      <Form.Check inline required className="add-reviews-body" feedback="Please select an option!" name={`form-check-${characteristic}`} type="radio" label={currentStats[2]} />
      <Form.Check inline required className="add-reviews-body" feedback="Please select an option!" name={`form-check-${characteristic}`} type="radio" label={currentStats[3]} />
      <Form.Check inline required className="add-reviews-body" feedback="Please select an option!" name={`form-check-${characteristic}`} type="radio" label={currentStats[4]} />
    </Form.Group>
  );
};

export default Characteristic;
