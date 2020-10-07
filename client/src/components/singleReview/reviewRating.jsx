// Importing Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

const Rating = ({ rate }) => (
  <div>
    <StarRatings
      rating={rate}
      starRatedColor="#F5B895"
      starEmptyColor="#B5C7D3"
      numberOfStars={5}
      starDimension="20px"
      starSpacing="1px"
      name="rating"
    />
  </div>
);

Rating.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default Rating;
