// Importing Dependencies
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';

// Importing SubComponents
import Rating from './reviewRating';
import ReviewBody from './reviewBody';

const ReviewTile = ({
  summary,
  body,
  name,
  date,
  rating,
}) => {
  const [dateVal, changeDate] = useState(''); // Set the state for the date
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [comma, changeComma] = useState(undefined);

  useEffect(() => { // On Mount, set the state to that of the props passed in
    changeDate(date);
    if (date !== undefined) { // Conditionally render the comma in the name/date Badge
      changeComma(', ');
      // Correct the Date
      const d = new Date(date);
      const monthID = d.getUTCMonth();
      const month = months[monthID];
      const year = d.getUTCFullYear();
      const days = d.getUTCDate();
      let appendDays;
      if (days === 1 || days[1] === 1) { // If the days end with 1 (eg. 1st, 21st, 31st)
        appendDays = 'st';
      } else if (days === 2 || days[1] === 2) { // If the days ends with 2 (eg. 2nd, 22nd)
        appendDays = 'nd';
      } else {
        appendDays = 'th';
      }
      const newDate = ` ${month} ${days}${appendDays}, ${year}`;
      changeDate(newDate);
    }
  }, [date]);

  return (
    <div className="review-outline">
      <Rating rate={rating} />
      <Badge variant="secondary" className="name-date">
        <b className="username">{name || ''}</b>
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
