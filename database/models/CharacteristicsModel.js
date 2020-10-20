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

// id,product_id,name
const characteristicsSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
});
// compile schema into a Model. A model is a class with which we construct documents.
const Characteristics = mongoose.model('Characteristics', characteristicsSchema);

module.exports = {
  Characteristics,
};
