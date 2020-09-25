// Importing Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';

const StaticStar = ({ rate }) => (
  <div>
    <ReactStars
      count={5}
      size={24}
      isHalf
      edit={false}
      value={rate}
      activeColor="#ffd700"
    />
  </div>
);

StaticStar.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default StaticStar;
