import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Recommend from './reviewRecommend';

const ReviewBody = ({ body, recommend }) => {
  const [show, collapseText] = useState(false); // Handle the collapsing and expanding of text
  const [more, showMore] = useState(false); // Handle whether there is more to be shown or not

  const [largeText, updateLarge] = useState(''); // This is the state of the majority of the text on the body
  const [smallText, updateSmall] = useState(''); // This is the state of the minority of the text on the body

  useEffect(() => {
    if (body.length > 250) {
      updateLarge(body.slice(0, 250));
      updateSmall(body.slice(250));
      showMore(true);
    } else {
      updateLarge(body);
      showMore(false);
    }
  }, [body]);

  const checkIfShown = (!show ? '...' : ''); // To check if the ... is needed after the text

  return (
    <div className="review-body">
      <p className="text-body">
        {largeText}
        {more ? checkIfShown : ''}
        {show ? smallText : ''}
      </p>
      {more ? <button type="button" className="show-more-less" onClick={() => collapseText(!show)}>{show ? 'Show Less...' : 'Show More...'}</button> : ''}
      <Recommend recommend={recommend} />
    </div>
  );
};

ReviewBody.propTypes = {
  body: PropTypes.string.isRequired,
  recommend: PropTypes.number.isRequired,
};

export default ReviewBody;
