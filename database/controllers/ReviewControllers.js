/* eslint-disable no-console */
const Review = require('../models/ReviewModel');

const ReviewController = {
  getAllReviews: (productId, countNum, pageNum, callback) => {
    // const maxReviews = params.count || 5;
    console.log('I\'m in the control room', productId);
    // const review = new Review({
    //   product_id: 90000,
    //   summary: 'Summary String',
    // }).save((response, error) => {
    //   console.log('error within save', error, 'response within save', response);

    Review.find({ product_id: productId }, (response, error) => {
      if (error) {
        console.log('response in error', response);
        callback(error, null);
      } else {
        console.log('success response', response);
        // make results look the way they need to
        // filter response and assign alias prior to formatting
        const format = {
          product_id: productId,
          page: pageNum,
          count: countNum,
          results: response.toArray(),
        };
        callback(null, format.results);
      }
    });
  },
  // getOneReview: (reviewId, callback) => {
  //   Review.findOne({ _id: reviewId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response);
  //     }
  //   });
  // },
  // setOneReview: (product, callback) => {
  //   Review.findByIdAndUpdate({ _id: product }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response);
  //     }
  //   });
  // },
  // getRatings: (productId, callback) => {
  //   Review.find({ product: productId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response.characteristics.ratings);
  //     }
  //   });
  // },
  // getRecommended: (productId, callback) => {
  //   Review.find({ product: productId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response.characteristics.recommended);
  //     }
  //   });
  // },
  // setReported: (reviewId, callback) => {
  //   Review.findOneAndUpdate({ _id: reviewId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response.report);
  //     }
  //   });
  // },
  // getReported: (reviewId, callback) => {
  //   Review.findOne({ _id: reviewId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response.report);
  //     }
  //   });
  // },
  // setHelpfulness: (reviewId, callback) => {
  //   Review.findOneAndUpdate({ _id: reviewId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response.helpfulness);
  //     }
  //   });
  // },
  // getHelpfulness: (reviewId, callback) => {
  //   Review.findOne({ _id: reviewId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response.helpfulness);
  //     }
  //   });
  // },
};

module.exports = ReviewController;
