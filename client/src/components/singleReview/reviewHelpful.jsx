import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import query from '../../../lib/routes';

const Helpful = ({ helpfulness, id }) => {
  const [currentHelp, setHelpful] = useState('');
  const [yesClicked, setClick] = useState(false);

  useEffect(() => {
    if (yesClicked) {
      setHelpful(helpfulness + 1);
    } else {
      setHelpful(helpfulness);
    }
  }, [yesClicked, helpfulness]);

  const postHelp = () => {
    query.putHelpfulReview(id, (err1) => {
      if (err1) {
        throw err1;
      } else {
        setClick(true); // Conditionally render the Yes button
      }
    });
  };

  return (
    <div>
      <div>
        {!yesClicked ? 'Helpful? ': 'Rated Helpful'}
        {!yesClicked ? <span className="helpful-yes" onClick={() => postHelp()}>Yes</span> : ''}
        {` (${currentHelp})  |  Report`}
      </div>
    </div>
  );
};

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Helpful;
