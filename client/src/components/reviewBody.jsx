import React, { useState } from 'react';

const ReviewBody = ({ body }) => {
  const [show, collapseText] = useState(false);



  return (
    <div>
      <p>{body}</p>
    </div>
  );
};

export default ReviewBody;