import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import query from '../../../lib/routes';

const Helpful = ({ helpfulness, id, iterator }) => {
  const [currentHelp, setHelpful] = useState('');
  const [yesClicked, setClick] = useState(true);

  useEffect(() => {
    setHelpful(helpfulness);
  }, [helpfulness]);

  const postHelp = () => {
    query.putHelpfulReview(id, (err1) => {
      if (err1) {
        throw err1;
      } else {
        query.searchReviews((err2, data) => {
          if (err2) {
            throw err2;
          } else {
            setHelpful(data.results[iterator].helpfulness); // Modify this to be dynamic
            setClick(false); // Conditionally render the Yes button
          }
        });
      }
    });
  };

  return (
    <div>
      <div>
        {yesClicked ? 'Helpful? ': 'Rated Helpful'}
        {yesClicked ? <span className="helpful-yes" onClick={() => postHelp()}>Yes</span> : ''}
        {` (${currentHelp})  |  Report`}
      </div>
    </div>
  );
};

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  iterator: PropTypes.number.isRequired,
};

export default Helpful;
