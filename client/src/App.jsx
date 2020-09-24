import React from 'react';
import getReviews from '../lib/routes';

const App = () => {
  const data = getReviews();
  return (<div>{data.data}</div>);
};

export default App;
