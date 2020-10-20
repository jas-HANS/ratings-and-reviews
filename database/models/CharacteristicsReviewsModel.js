// include Mongoose
const mongoose = require('mongoose');

// With Mongoose, everything is derived from a Schema. Let's get a reference to it and define
// The following are all the valid SchemaTypes in Mongoose.
//   String
//   Number
//   Date
//   Buffer
//   Boolean
//   Mixed
//   ObjectId
//   Array
//   Decimal128
//   Map
//   Schema

// id,characteristic_id,review_id,value
const characteristicsReviewSchema = new mongoose.Schema({
  characteristic_id: Number,
  review_id: Number,
  value: Number,
});
// compile schema into a Model. A model is a class with which we construct documents.
const CharacteristicsReview = mongoose.model('CharacteristicsReview', characteristicsReviewSchema);

module.exports = {
  CharacteristicsReview,
};
