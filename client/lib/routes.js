import axios from 'axios';

const searchReviews = (callback) => {
  const id = 150;
  axios.get(`http://52.26.193.201:3000/reviews/${id}/list`)
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

export default searchReviews;
