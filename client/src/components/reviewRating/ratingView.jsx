import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { v4 as uuidv4 } from 'uuid'; 
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import query from '../../../lib/routes';

import RatingStarBreakdown from './ratingBreakdown';
import ProductBreakdown from './productBreakdown';

const RatingView = ({ id, change, sort, remove }) => {
  const [ratingTotal, setRatingTotal] = useState(0);
  const [ratingData, setRatingData] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);
  const [recommend, setRecommend] = useState(0);

  useEffect(() => {
    // Query the API here and parse the information to give back the total
    query.getRatingTotals(id, (err, data) => {
      if (err) {
        throw err;
      } else {
        const keys = Object.keys(data);
        // console.log(keys);
        const newObject = { ...data };
        for (let i = 1; i <= 5; i += 1) {
          if (!keys.includes(i.toString())) {
            newObject[i] = 0;
          }
        }
        setRatingData(newObject);
        const weightedSum = (newObject[1] * 1) + (newObject[2] * 2) + (newObject[3] * 3)
                          + (newObject[4] * 4) + (newObject[5] * 5);
        const totalSum = newObject[1] + newObject[2] + newObject[3] + newObject[4] + newObject[5];
        setTotalReviews(totalSum);
        setRatingTotal(Math.round((weightedSum / totalSum) * 10) / 10);
      }
    });
    query.getRecommendedTotal(id, (err, data) => {
      if (err) {
        throw err;
      } else {
        const isRec = data[1];
        const total = data[1] + data[0];
        setRecommend(Math.round((isRec / total) * 100));
      }
    });
  }, []);

  return (
    <Col>
      <Row style={{ justifyContent: 'center' }}>
        <h3 className="rating-overall-reviews">
          {ratingTotal || 0}
        </h3>
        <StarRatings
          rating={ratingTotal || 0}
          starRatedColor="#F5B895"
          starEmptyColor="#B5C7D3"
          numberOfStars={5}
          starDimension="30px"
          starSpacing="2px"
          name="overall-rating"
        />
      </Row>
      <Row className="recommend-reviewers">
        {ratingTotal ? `${recommend}% of reviewers recommend this product!` : 'No recommended reviews!'}
      </Row>
      <Row>
        <Col className="rating-breakdown-col">
          {Object.keys(ratingData).map((i) => <RatingStarBreakdown key={uuidv4()} index={Number(i)} data={Number(ratingData[i])} total={totalReviews} change={change} />)}
          <div className="filtered-by-ratings">
            {/* This tells the user which stars they are sorting by. */}
            {/* Had to do a bunch of ternaries in order to check if a comma was needed */}
            {/* Ideally this would be simplified however this seems to work. */}
            {sort.length > 0 ? `Filtered by (
              ${sort[0] ? `${sort[0]} Stars` : ''}
              ${sort[0] && sort[1] ? ',' : ''}
              ${sort[1] ? `${sort[1]} Stars` : ''}
              ${sort[1] && sort[2] ? ',' : ''}
              ${sort[2] ? `${sort[2]} Stars` : ''}
              ${sort[2] && sort[3] ? ',' : ''}
              ${sort[3] ? `${sort[3]} Stars` : ''}
              ${sort[3] && sort[4] ? ',' : ''}
              ${sort[4] ? `${sort[4]} Stars` : ''}
              ${sort[4] && sort[5] ? ',' : ''}
              ${sort[5] ? `${sort[5]} Stars` : ''} ).` : 'Not filtered.'}
            <br />
            {sort.length !== 0 ? <input className="remove-filters-button" type="button" value="Remove Filters" onClick={() => remove()} /> : ''}
          </div>
        </Col>
      </Row>
      <Row>
        <ProductBreakdown id={id} />
      </Row>
    </Col>
  );
};

RatingView.propTypes = {
  id: PropTypes.number.isRequired,
  sort: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default RatingView;
