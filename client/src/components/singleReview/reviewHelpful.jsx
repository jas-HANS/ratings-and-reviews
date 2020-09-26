import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import query from '../../../lib/routes';

const Helpful = ({ helpfulness, id }) => {
  const [currentHelp, setHelpful] = useState('');

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
            setHelpful(data.data.results[0].helpfulness); // Modify this to be dynamic
          }
        });
      }
    });
  };

  return (
    <div>
      <div>
        Helpful?
        {' '}
        <span className="helpful-yes" onClick={() => postHelp()}>Yes</span>
        {` (${currentHelp})`}
        {'  '}
        |
        {'  '}
        Report
      </div>
    </div>
  );
};

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Helpful;
