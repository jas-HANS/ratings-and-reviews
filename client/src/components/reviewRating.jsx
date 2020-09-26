// Importing Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';

const Rating = ({ rate }) => (
  <div>
    <ReactStars
      count={5}
      size={24}
      isHalf
      edit={false}
      value={rate}
      activeColor="#F5B895"
    />
  </div>
);

Rating.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default Rating;
