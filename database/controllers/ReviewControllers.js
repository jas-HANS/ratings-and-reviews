// define queries here
const { Review } = require('../models/ReviewModel');

const ReviewController = {
  getAllReviews: (productId, callback) => {
    Review.find({ product: productId }, (error, doc) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, doc.results);
      }
    });
  },
  getOneReview: (reviewId, callback) => {
    Review.find({ _id: reviewId }, (error, doc) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, doc);
      }
    });
  },
  getReviewPhotos: (reviewId, callback) => {
    Review.find({ _id: reviewId }, (error, doc) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, doc.photos);
      }
    });
  },
  getRatings: (productId, callback) => {
    Review.find({ product: productId }, (error, doc) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, doc.characteristics.ratings);
      }
    });
  },
  getCharacteristics: (productId, callback) => {
    Review.find({ product: productId }, (error, doc) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, doc.characteristics.characteristics);
      }
    });
  },
  getRecommended: (productId, callback) => {
    Review.find({ product: productId }, (error, doc) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, doc.characteristics.recommended);
      }
    });
  },
};

module.exports = {
  ReviewController,
};
