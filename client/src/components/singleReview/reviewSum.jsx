import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({ summary }) => {
  let showText = '';
  let extraText = '';
  if (summary.length <= 60) {
    showText = summary;
  } else {
    showText = `${summary.slice(0, 60)}...`;
    extraText = `...${summary.slice(60)}`;
  }
  return (
    <div>
      <h5 className="review-summary-text">{showText}</h5>
      <span className="review-summary-extra">{extraText || ''}</span>
    </div>
  );
};

Summary.propTypes = {
  summary: PropTypes.string.isRequired,
};

export default Summary;
