import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

import StarRatings from 'react-star-ratings';

const RatingStarBreakdown = ({ index, data, total, change }) => {
  return (
    <Row className="rating-breakdown-row" onClick={() => change(index)}>
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
        <ProgressBar now={((data / total) * 100) || 0} label={data || 0} className="progress-bars-ratings" />
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
