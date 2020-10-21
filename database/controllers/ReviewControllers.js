// define queries here
import { Review } from '../models/ReviewModel';

const ReviewController = {
  getAllReviews: (productId, callback) => {
    // const maxReviews = params.count || 5;
    Review.find({ product: productId }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.results);
      }
    });// .setOptions({ limit: maxReviews });
  },
  getOneReview: (reviewId, callback) => {
    Review.findOne({ _id: reviewId }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response);
      }
    });
  },
  setOneReview: (product, callback) => {
    Review.findByIdAndUpdate({ _id: product }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response);
      }
    });
  },
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
  setReported: (reviewId, callback) => {
    Review.findOneAndUpdate({ _id: reviewId }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.report);
      }
    });
  },
  // getReported: (reviewId, callback) => {
  //   Review.findOne({ _id: reviewId }, (error, response) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       callback(null, response.report);
  //     }
  //   });
  // },
  setHelpfulness: (reviewId, callback) => {
    Review.findOneAndUpdate({ _id: reviewId }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.helpfulness);
      }
    });
  },
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

export default {
  ReviewController,
};
