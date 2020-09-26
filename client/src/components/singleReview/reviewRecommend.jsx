import React from 'react';
import PropTypes from 'prop-types';

const Recommend = ({ recommend }) => (
  <div className="recommend">
    {recommend ? 'I recommend this product ' : ''}
    <span className="recommend-checkmark">&#x2713;</span>
  </div>
);

Recommend.propTypes = {
  recommend: PropTypes.number.isRequired,
};

export default Recommend;
