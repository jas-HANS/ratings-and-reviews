const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'LoveBud',
  database: 'review_data',
});

connection.connect();

const getReviews = (paramsObj, callback) => {
  const sql = `SELECT * FROM reviews WHERE product_id=${paramsObj.product_id}`;
  connection.query(sql, paramsObj.product_id, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

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
  const sql = 'UPDATE reviews SET helpfulness = helpfulness + 1';
  connection.query(sql, paramsObj.review_id, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const harmfulReview = (paramsObj, callback) => {
  const sql = `UPDATE reviews SET reported = true WHERE id = ${paramsObj.review_id}`;
  connection.query(sql, paramsObj.review_id, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getReviews,
  postReview,
  helpfulReview,
  harmfulReview,
};
