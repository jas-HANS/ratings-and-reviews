const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('../client/dist'));

app.listen(PORT, () => {
  console.log(`Server running and listening now on port: ${PORT}`);
});

// Route Connections

// get request for all reviews for a single product
// find the product within product where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data

// get request for a single product's metadata
// find the metadata within reviews where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data

// post request for adding a single review to a single product
// find the product within product where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data

// put request for marking a single review as helpful
// find the review in product's results array (reviews) where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data

// put request for marking a single review as inappropriate
// find the review in product's results array (reviews) where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data

/* * * * * * * * *
* CLIENT ROUTES  *
* * * * * * * * */

/*
get all reviews for one product
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

const postNewReview = (productId, newReviewBody, callback) => {
  axios.post(`http://52.26.193.201:3000/reviews/${productId}`, newReviewBody)
    .then(() => callback(null))
    .catch((err) => callback(err));
};
*/
