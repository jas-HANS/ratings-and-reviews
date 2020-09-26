import axios from 'axios';

const searchReviews = (callback) => {
  const id = 125;
  axios.get(`http://52.26.193.201:3000/reviews/${id}/list`)
    .then((data) => callback(null, data.data))
    .catch((err) => callback(err, null));
};

const putHelpfulReview = (id, callback) => {
  axios.put(`http://52.26.193.201:3000/reviews/helpful/${id}`)
    .then(() => callback(null))
    .catch((err) => callback(err));
};
export default {
  searchReviews,
  putHelpfulReview,
};
