import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import query from '../../../lib/routes';

const RatingView = ({ id }) => {
  const [ratingTotal, setRatingTotal] = useState(0);

  useEffect(() => {
    // Query the API here and parse the information to give back the total
    query.getRatingTotals(id, (err, data) => {
      if (err) {
        throw err;
      } else {
        const weightedSum = (data[1] * 1) + (data[2] * 2) + (data[3] * 3)
                          + (data[4] * 4) + (data[5] * 5);
        const totalSum = data[1] + data[2] + data[3] + data[4] + data[5];
        setRatingTotal(Math.round((weightedSum / totalSum) * 10) / 10);
      }
    }, []);
  });

  return (
    <Col>
      <Row>
        <h3 className="rating-overall-reviews">
          {ratingTotal}
        </h3>
        <StarRatings
          rating={ratingTotal}
          starRatedColor="#F5B895"
          starEmptyColor="#B5C7D3"
          numberOfStars={5}
          starDimension="30px"
          starSpacing="2px"
          name="overall-rating"
        />
      </Row>
      <Row>
        {/* Star Breakdown Here */}
        5
        <br />
        4
        <br />
        3
        <br />
        2
        <br />
        1
      </Row>
      <Row>
        {/* Product Breakdown Here */}
      </Row>
    </Col>
  );
};

RatingView.propTypes = {
  id: PropTypes.number.isRequired,
};

export default RatingView;
