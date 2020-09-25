import axios from 'axios';

const getReviews = (callback) => {
  axios.get('http://52.26.193.201:3000/reviews/1/list')
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

export default getReviews;
