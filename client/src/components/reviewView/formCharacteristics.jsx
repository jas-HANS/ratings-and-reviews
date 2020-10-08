import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const Characteristic = ({ characteristic, data, change }) => {
  const [currentStats, changeStats] = useState([]);
  const [currentRating, changeRating] = useState(0);
  const [charId, changeId] = useState(0);
  // need to pass back up the id and the rating for a specific characteristic
  // Handle the data coming in
  // Will come in as an object with an id and value
  // Each object key will be the characteristic name
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
    changeId(data.id);
  }, []);

  return (
    <Form.Group style={{ padding: '0px', fontSize: '15px' }}>
      <Form.Row style={{ justifyContent: 'left', fontSize: '20px' }}>
        <Form.Label className="add-review-header" style={{ padding: "2px" }}>{`${characteristic}:`}</Form.Label>
      </Form.Row>
      <Form.Check inline required className="add-reviews-body" name={`form-check-${characteristic}`} type="radio" label={currentStats[0]} onClick={() => { change(charId, 1); }} />
      <Form.Check inline required className="add-reviews-body" name={`form-check-${characteristic}`} type="radio" label={currentStats[1]} onClick={() => { change(charId, 2); }} />
      <Form.Check inline required className="add-reviews-body" name={`form-check-${characteristic}`} type="radio" label={currentStats[2]} onClick={() => { change(charId, 3); }} />
      <Form.Check inline required className="add-reviews-body" name={`form-check-${characteristic}`} type="radio" label={currentStats[3]} onClick={() => { change(charId, 4); }} />
      <Form.Check inline required className="add-reviews-body" name={`form-check-${characteristic}`} type="radio" label={currentStats[4]} onClick={() => { change(charId, 5); }} />
    </Form.Group>
  );
};

export default Characteristic;
