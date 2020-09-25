// Importing Dependencies
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const StaticStar = ({ rate }) => {
  return (
    <div>
      <StarRatingComponent
        name="star"
        starColor="#F5B895"
        emptyStarColor="#373838"
        editing={false}
        starCount={5}
        value={rate}
        className="static-stars"
      />
    </div>
  );
};

export default StaticStar;
