/* eslint-disable no-console */
const express = require('express');

const app = express();
const path = require('path');

const PORT = 3005;
const cors = require('cors');
const bodyParser = require('body-parser');
const queries = require('../database/queries');

app.use(express.static(path.join(__dirname, './frontend/build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`🛥  Server is running and listening on port ${PORT} 🛥`));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/reviews/:product_id/list', (req, res) => {
  queries.getReviews({ ...req.params, ...req.query }, (error, results) => {
    if (error) {
      console.log('Oops! Could not get reviews 🥺');
      res.status(400).send(error);
    } else {
      console.log('Bingo! Reviews retrieved 🥳');
      res.status(200).send(results);
    }
  });
});

app.post('/reviews/:product_id', (req, res) => {
  const reviewBody = req.body;
  queries.postReview(reviewBody, (error, results) => {
    if (error) {
      console.log('Oops! Could not add review 🥺');
      res.status(400).send(error);
    } else {
      console.log('Huzzah! Review was posted 🥳');
      res.status(200).send(results);
    }
  });
});

app.put('/reviews/helpful/:review_id', (req, res) => {
  const reviewId = req.params;
  queries.helpfulReview(reviewId, (error, results) => {
    if (error) {
      console.log('Oops! Could not mark review as helpful 🥺');
      res.status(400).send(error);
    } else {
      console.log('Huzzah! Review was marked helpful 🥳');
      res.status(200).send(results);
    }
  });
});

app.put('/reviews/report/:review_id', (req, res) => {
  const reviewId = req.params;
  queries.harmfulReview(reviewId, (error, results) => {
    if (error) {
      console.log('Oops! Could not report review as harmful 🥺');
      res.status(400).send(error);
    } else {
      console.log('Huzzah! Review was reported harmful 🥳');
      res.status(200).send(results);
    }
  });
});
