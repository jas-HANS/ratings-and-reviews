import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import query from '../../../lib/routes';

const Helpful = ({ helpfulness, id, help, change }) => {
  const [currentHelp, setHelpful] = useState('');
  const [yesClicked, setClick] = useState(false);

  useEffect(() => {
    // Check if passed down prop contains the current id
    if (help.includes(id)) { // If the arr contains the id (has been pressed)
      setClick(true);
    }
  });

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
        // Since it is clicked, pass the id back up to the top class
        change(id);
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
