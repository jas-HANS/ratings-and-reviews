// Importing Dependencies
import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';

// Importing SubComponents
import StaticStar from './starRating';

const ReviewTile = ({ summary, body, name, date, rating }) => {
  const [summaryVal, changeSum] = useState(''); // Set the state for the summary
  const [bodyVal, changeBod] = useState(''); // Set the state for the body
  const [nameVal, changeName] = useState(''); // Set the state for the name
  const [dateVal, changeDate] = useState(''); // Set the state for the date
  const [comma, changeComma] = useState(undefined);

  useEffect(() => { // On Mount, set the state to that of the props passed in
    changeSum(summary);
    changeBod(body);
    changeName(name);
    changeDate(date);
    if (date !== undefined) { // Conditionally render the comma in the name/date Badge
      changeComma(', ');
    }
  }, [summary, body, name, date]);

  return (
    <div className="review-outline">
      <StaticStar rate={rating} />
      <Badge variant="secondary" className="name-date">
        {nameVal || ''}
        {comma || ''}
        {dateVal || ''}
      </Badge>
      <h4 className="review-summary">{summaryVal}</h4>
      {/* Overflow div for summary */}
      <div className="review-body">
        {bodyVal}
      </div>
      {/* Helpful and Report Buttons */}
    </div>
  );
};

// TO DO: PROP VALIDATION
// ReviewTile.propTypes = {
//   body: PropTypes.string.isRequired,
//   summary: PropTypes.string.isRequired,
// };

export default ReviewTile;
