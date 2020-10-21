import { Characteristics } from '../models/CharacteristicsModel';

const CharacteristicsController = {
  getCharacteristicName: (productId, callback) => {
    Characteristics.find({ product_id: productId }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, response.name);
      }
    });
  },
};

module.exports = {
  CharacteristicsController,
};
