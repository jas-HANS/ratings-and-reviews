// Importing Dependencies
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';

// Importing SubComponents
import Rating from './reviewRating';
import ReviewBody from './reviewBody';
import Summary from './reviewSum';
import Helpful from './reviewHelpful';

const ReviewTile = ({ data, iterator }) => {
  const [dateVal, changeDate] = useState(''); // Set the state for the date
  const [comma, changeComma] = useState(undefined);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => { // On Mount, set the state to that of the props passed in
    changeDate(data.date);
    if (dateVal !== undefined) { // Conditionally render the comma in the name/date Badge
      changeComma(', ');
      // Correct the Date
      const d = new Date(data.date); // Keep as the prop
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
  }, [data.date, dateVal, months]); // ABnBLinter is requiring this for some reason.

  return (
    <div className="review-outline">
      <Rating rate={data.rating} />
      <Badge variant="secondary" className="name-date">
        <b className="username">{data.reviewer_name || ''}</b>
        {comma || ''}
        {dateVal || ''}
      </Badge>
      <Summary summary={data.summary} />
      <ReviewBody body={data.body} recommend={data.recommend} />
      <Helpful helpfulness={data.helpfulness} id={data.review_id} iterator={iterator} />
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
    helpfulness: PropTypes.number.isRequired,
    review_id: PropTypes.number.isRequired,
  }).isRequired,
  iterator: PropTypes.number.isRequired,
};

export default ReviewTile;
