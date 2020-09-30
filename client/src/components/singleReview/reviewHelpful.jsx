import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';

import query from '../../../lib/routes';
import Reported from './reviewReported';

const Helpful = ({ helpfulness, id, help, change }) => {
  const [currentHelp, setHelpful] = useState('');
  const [yesClicked, setClick] = useState(false);

  useEffect(() => {
    // Check if passed down prop contains the current id
    if (help.includes(id)) { // If the arr contains the id (has been pressed)
      setClick(true);
    }
  }, [help, id]); // Added this in

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
        change(id, 'help');
        setClick(true); // Conditionally render the Yes button
      }
    });
  };

  return (
    <div className="reviews-helpful-container">
      <Row>
        {!yesClicked ? 'Helpful? ' : 'Rated Helpful'}
        {!yesClicked ? <span className="helpful-yes" onClick={() => postHelp()}>Yes</span> : ''}
        {` (${currentHelp})   |`}
        <Reported id={3} report={change} />
      </Row>
    </div>
  );
};

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  help: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

};

export default Helpful;
