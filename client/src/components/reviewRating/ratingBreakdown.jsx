import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

import StarRatings from 'react-star-ratings';

const RatingStarBreakdown = ({ index, data, total, change }) => {
  const [hasBeenClicked, changeClick] = useState(false);

  const handleAddRemoveSort = (rating) => {
    if (hasBeenClicked) {
      change(rating, 'remove');
      changeClick(false);
    } else {
      change(rating, 'add');
      changeClick(true);
    }
  };
  return (
    <Row className="rating-breakdown-row" onClick={() => handleAddRemoveSort(index)}>
      <Col lg="6" xl="5">
        <StarRatings
          rating={index}
          starRatedColor="#F5B895"
          starEmptyColor="#B5C7D3"
          numberOfStars={index}
          starDimension="15px"
          starSpacing="1px"
          name="star-breakdown"
        />
      </Col>
      <Col className="progress-bar-ratings" lg="6" xl="7">
        <ProgressBar now={((data / total) * 100)} label={data} className="progress-bars-ratings" />
      </Col>
    </Row>
  );
};

RatingStarBreakdown.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default RatingStarBreakdown;
