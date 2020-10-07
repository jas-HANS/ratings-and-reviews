import axios from 'axios';

const searchReviews = (sort, id, count, callback) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/list`, { params: { count, sort } })
    .then((data) => callback(null, data.data))
    .catch((err) => callback(err, null));
};

const getRatingTotals = (id, callback) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/meta`)
    .then((data) => callback(null, data.data.ratings))
    .catch((err) => callback(err, null));
};

const getRecommendedTotal = (id, callback) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/meta`)
    .then((data) => callback(null, data.data.recommended))
    .catch((err) => callback(err, null));
};

const getCharacteristics = (id, callback) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/meta`)
    .then((data) => callback(null, data.data.characteristics))
    .catch((err) => callback(err, null));
};

const putHelpfulReview = (id, callback) => {
  axios.put(`http://52.26.193.201:3000/reviews/helpful/${id}`)
    .then(() => callback(null))
    .catch((err) => callback(err));
};

const putReportedReview = (id, callback) => {
  axios.put(`http://52.26.193.201:3000/reviews/report/${id}`)
    .then(() => callback(null))
    .catch((err) => callback(err));
};

export default {
  searchReviews,
  putHelpfulReview,
  getRatingTotals,
  putReportedReview,
  getRecommendedTotal,
  getCharacteristics,
};
