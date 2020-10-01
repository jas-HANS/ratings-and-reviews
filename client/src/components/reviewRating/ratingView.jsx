import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import query from '../../../lib/routes';

import RatingStarBreakdown from './ratingBreakdown';

const RatingView = ({ id, changeSort }) => {
  const [ratingTotal, setRatingTotal] = useState(0);
  const [ratingData, setRatingData] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    // Query the API here and parse the information to give back the total
    query.getRatingTotals(id, (err, data) => {
      if (err) {
        throw err;
      } else {
        setRatingData(data);
        const weightedSum = (data[1] * 1) + (data[2] * 2) + (data[3] * 3)
                          + (data[4] * 4) + (data[5] * 5);
        const totalSum = data[1] + data[2] + data[3] + data[4] + data[5];
        setTotalReviews(totalSum);
        setRatingTotal(Math.round((weightedSum / totalSum) * 10) / 10);
      }
    }, []);
  }, []);

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
      {/* Star Breakdown Start */}
      <Row>
        <Col className="rating-breakdown-col">
          {Object.keys(ratingData).map((i) => <RatingStarBreakdown key={i} index={Number(i)} data={ratingData[i]} total={totalReviews} change={changeSort} />)}
        </Col>
      </Row>
      {/* Star Breakdown End */}
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
