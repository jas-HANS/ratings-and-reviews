/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'LoveBud',
  database: 'review_data',
});

connection.connect();

const getReviews = (paramsObj, callback) => {
  console.log('paramsObj in get reviews query', paramsObj);
  const sql = `SELECT * FROM reviews WHERE product_id=${paramsObj.product_id}`;
  connection.query(sql, paramsObj.product_id, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// newReviewBody = {
//   product_id INT NOT NULL,
//   rating INT NOT NULL,
//   summary TINYTEXT NOT NULL,
//   body MEDIUMTEXT NOT NULL,
//   recommend BOOLEAN NOT NULL,
//   reviewer_name VARCHAR(50) NOT NULL,
//   reviewer_email VARCHAR(255) NOT NULL,
// }

const postReview = (paramsObj, callback) => {
  const sql = 'INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const reviewArgs = [
    paramsObj.product_id,
    paramsObj.rating,
    paramsObj.summary,
    paramsObj.body,
    paramsObj.recommend,
    paramsObj.reviewer_name,
    paramsObj.reviewer_email,
  ];
  connection.query(sql, reviewArgs, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const helpfulReview = (paramsObj, callback) => {
  // const sql = 'UPDATE reviews SET helpfulness = helpfulness + 1';
  console.log(paramsObj);
};

const harmfulReview = (paramsObj, callback) => {
  // const sql = 'UPDATE reviews SET reported = true WHERE id = reviewId';
  console.log(paramsObj);
};

module.exports = {
  getReviews,
  postReview,
  helpfulReview,
  harmfulReview,
};
