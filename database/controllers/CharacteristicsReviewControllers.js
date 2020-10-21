import { CharacteristicsReview } from '../models/CharacteristicsReviewsModel';

const CharacteristicsReviewController = {
  getCharacteristicReviewValue: (characteristicId, reviewId, callback) => {
    CharacteristicsReview.find(
      { characteristic_id: characteristicId, review_id: reviewId },
      (error, response) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, response.value);
        }
      },
    );
  },
};

module.exports = {
  CharacteristicsReviewController,
};
