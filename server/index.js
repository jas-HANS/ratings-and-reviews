/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const cors = require('cors');
const { ReviewController } = require('../database/controllers/ReviewControllers');

const mongoDB = 'mongodb://localhost:27017/SDC';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const PORT = 3002;

app.use(express.static('../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running and listening on port: ${PORT}`);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Route Connections

// get request for all reviews for a single product
// find the product within product where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data
// app.get('/reviews/:product_id/list', (req, res) => {
//   console.log(req.params.product_id);
//   const dummyObj = {
//     product: req.params.product_id,
//     page: 0,
//     count: 5,
//     results: [],
//   };
//   // query db for all reviews for product 2
//   // then map over result of query
//   // convert to api results model
//   // set dummy obj results to new obj and send that back

//   // const result = Review.findById({ product_id: 2 });

//   res.send(dummyObj);
// });

app.get('/reviews/:product_id/list', (req, res) => {
  ReviewController.getAllReviews(req.params.id, (error, doc) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(doc);
    }
  });
});

// get request for a single product's metadata
// find the metadata within reviews where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data
app.get('/reviews/:product_id/meta', (req, res) => {
  console.log(req.params.product_id);
  const dummyObj = {
    product_id: req.params.product_id,
    ratings: {},
    recommended: {},
    characteristics: {},
  };
  // query db for all characteristics for product 2
  // then map over result of query
  // convert to api results model
  // set dummy obj results to new obj and send that back
  // const result = Review.findById({ product_id: 2 });

  res.send(dummyObj);
});

// req.body (content of review) will be used AND req.params (product id)
// post request for adding a single review to a single product
// find the product within product where the product id matches the param id
//  if there is an error
//   send a failed status and send failed message OR log error message
//  else
//   set a successful status and send data
app.post('/reviews/:product_id', (req, res) => {
  console.log(req.params.product_id);
  console.log(req.body);
  const dummyBody = {
    rating: 5,
    summary: 'Summary text of the review',
    body: 'Continued or full text of the review',
    recommend: true, // should this be 1?
    name: 'Username for reviewer',
    email: 'Email for reviewer',
    photos: [],
    characteristics: {}, // characteristics are represented by the charId and num value
  };
  // query db for all reviews for product 2
  // then map over result of query
  // convert to api results model
  // set dummy obj results to new obj and send that back
  // const result = Review.findById({ product_id: 2 });

  res.send(dummyBody);
});

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
