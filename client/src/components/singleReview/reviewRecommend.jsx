import React from 'react';
import PropTypes from 'prop-types';

const Recommend = ({ recommend }) => (
  <div className="recommend">
    {recommend ? <span className="recommend-checkmark">&#x2713;</span> : ''}
    {recommend ? ' I recommend this product ' : ''}
  </div>
);

Recommend.propTypes = {
  recommend: PropTypes.number.isRequired,
};

export default Recommend;
