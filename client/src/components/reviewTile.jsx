// Importing Dependencies
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';

// Importing SubComponents
import StaticStar from './starRating';
import ReviewBody from './reviewBody';

const ReviewTile = ({
  summary,
  body,
  name,
  date,
  rating,
}) => {
  const [dateVal, changeDate] = useState(''); // Set the state for the date
  const [comma, changeComma] = useState(undefined);

  useEffect(() => { // On Mount, set the state to that of the props passed in
    changeDate(date);
    if (date !== undefined) { // Conditionally render the comma in the name/date Badge
      changeComma(', ');
    }
  }, [date]);

  return (
    <div className="review-outline">
      <StaticStar rate={rating} />
      <Badge variant="secondary" className="name-date">
        {name || ''}
        {comma || ''}
        {dateVal || ''}
      </Badge>
      <h4 className="review-summary">{summary}</h4>
      <ReviewBody body={body} />
      {/* Helpful and Report Buttons */}
    </div>
  );
};

ReviewTile.propTypes = {
  summary: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ReviewTile;
