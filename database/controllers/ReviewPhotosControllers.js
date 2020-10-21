import { ReviewPhotos } from '../models/ReviewPhotosModel';

const ReviewPhotosController = {
  getAllPhotos: (reviewId, callback) => {
    ReviewPhotos.find({ review_id: reviewId }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.url);
      }
    });
  },
};

module.exports = {
  ReviewPhotosController,
};
