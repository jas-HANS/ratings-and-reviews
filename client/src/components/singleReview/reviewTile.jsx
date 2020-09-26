// Importing Dependencies
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';

// Importing SubComponents
import Rating from './reviewRating';
import ReviewBody from './reviewBody';

const ReviewTile = ({ data }) => {
  const [dateVal, changeDate] = useState(''); // Set the state for the date
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [comma, changeComma] = useState(undefined);

  useEffect(() => { // On Mount, set the state to that of the props passed in
    changeDate(data.date);
    if (data.date !== undefined) { // Conditionally render the comma in the name/date Badge
      changeComma(', ');
      // Correct the Date
      const d = new Date(data.date);
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
  }, [data.date, months]);

  return (
    <div className="review-outline">
      <Rating rate={data.rating} />
      <Badge variant="secondary" className="name-date">
        <b className="username">{data.reviewer_name || ''}</b>
        {comma || ''}
        {dateVal || ''}
      </Badge>
      <h4 className="review-summary">{data.summary}</h4>
      <ReviewBody body={data.body} recommend={data.recommend} />
    </div>
  );
};

ReviewTile.propTypes = {
  data: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reviewer_name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    recommend: PropTypes.number.isRequired,
  }).isRequired,
};

export default ReviewTile;
