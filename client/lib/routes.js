import axios from 'axios';

const searchReviews = (id, count, callback) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/list`, { params: { count: count, sort: 'relevant' } })
    .then((data) => callback(null, data.data))
    .catch((err) => callback(err, null));
};

const getRatingTotals = (id, callback) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/meta`)
    .then((data) => callback(null, data.data.ratings))
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
  getRatingTotals,
};
