/* eslint-disable no-console */
const express = require('express');

const app = express();
const path = require('path');

const PORT = 3005;
const cors = require('cors');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const queries = require('../database/queries');

app.use(express.static(path.join(__dirname, './frontend/build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`🛥  Server is running and listening on port ${PORT} 🛥`));

// app.post('/', (req, res) => {
//   res.send('index');
// });

app.get('/reviews/:product_id/list', (req, res) => {
  console.log('params in get req', req.params);
  console.log('query in get req', req.query);
  // res.status(200).send(req.params);
  // res.status(200).send(req.query);
  // res.status(200).send({ ...req.params, ...req.query });
  queries.getReviews({ ...req.params, ...req.query }, (error, results) => {
    // count and page needs to be considered somewhere
    if (error) {
      console.log('Oops! Could not get reviews 🥺');
    } else {
      console.log('Bingo! Reviews retrieved 🥳');
      res.status(200).send(results);
    }
  });
});

app.post('/reviews/:product_id', (req, res) => {
  const reviewBody = req.body;
  console.log('review body in post req', reviewBody);
  queries.postReview(reviewBody, (error, results) => {
    if (error) {
      console.log('Oops! Could not add review 🥺');
    } else {
      console.log('Huzzah! Review was posted 🥳');
      res.status(200).send(results);
    }
  });
});

app.put('/reviews/helpful/:review_id}', (req, res) => {
  const reviewId = req.params;
  console.log(reviewId);
  queries.helpfulReview(reviewId, (error, results) => {
    if (error) {
      console.log('Oops! Could not mark review as helpful 🥺');
    } else {
      console.log('Huzzah! Review was marked helpful 🥳');
      res.status(200).send(results);
    }
  });
});

app.put('/reviews/report/:review_id}', (req, res) => {
  const reviewId = req.params;
  console.log(reviewId);
  queries.harmfulReview(reviewId, (error, results) => {
    if (error) {
      console.log('Oops! Could not mark review as helpful 🥺');
    } else {
      console.log('Huzzah! Review was marked helpful 🥳');
      res.status(200).send(results);
    }
  });
});

/* * * * * * * * *
* CLIENT ROUTES  *
* * * * * * * * */

/*
count is currently based off metadata, give default count or total num of reviews
sort can be helpful, relevant or newest. Does not sort total reviews, only the total count reviews

| count  | integer | Specifies how many results per page to return. Default 5.
| sort  | text | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"

get all reviews for one product
const searchReviews = (sort, id, count, callback) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/list`, { params: { count, sort } })
    .then((data) => callback(null, data.data))
    .catch((err) => callback(err, null));
};

newReviewBody = {
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date TIMESTAMP,
  summary TINYTEXT NOT NULL,
  body MEDIUMTEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reviewer_name VARCHAR(50) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  }

const postNewReview = (productId, newReviewBody, callback) => {
  axios.post(`http://52.26.193.201:3000/reviews/${productId}`, newReviewBody)
    .then(() => callback(null))
    .catch((err) => callback(err));
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
*/
