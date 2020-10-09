import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import StarRatings from 'react-star-ratings';

const Stars = ({ isSubmit, callback }) => {
  const [ratingMeaning, setMeaning] = useState('');
  const [rate, setRating] = useState(0);

  useEffect(() => {
    const starMeaning = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
    setMeaning(starMeaning[rate - 1]); // Set the meaning to be one less than the rating
    // This is because there is no 0 star rating and no 6 star rating so the
    // 1 star will show the 0 index
  }, [rate]);

  // useEffect(() => {
  //   callback(rate);
  // }, [isSubmit]);

  return (
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
        changeRating={(rating) => { callback(rating); setRating(rating); }}
      />
      <span style={{ paddingLeft: '10px' }} className="add-reviews-body">{ratingMeaning}</span>
    </Form.Group>
  );
};

export default Stars;
