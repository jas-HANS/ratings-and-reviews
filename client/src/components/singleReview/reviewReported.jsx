import React, { useState } from 'react';
import PropTypes from 'prop-types';

import query from '../../../lib/routes';

const Reported = ({ id, report }) => {
  const [isReported, setReported] = useState(false);

  const handleReport = () => {
    query.putReportedReview(id, (err) => {
      if (err) {
        throw err;
      } else {
        report(id, 'report');
        setReported(true);
      }
    });
  };
  return (
    <div className="reviews-reported">
      {!isReported ? <span className="helpful-yes" onClick={() => handleReport()}>Report</span> : 'Reported'}
    </div>
  );
};

Reported.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Reported;
