/* eslint-disable no-console */
// include Mongoose
const mongoose = require('mongoose');
// open a connection to the database
mongoose.connect('mongodb:localhost/SDC', { useNewUrlParser: true });
// get notified if we connect successfully or if a connection error occurs
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log.bind(console, 'connection success');
});
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

const reviewSchema = new mongoose.Schema({
  product_id: Number,
  rating: Number,
  summary: String,
  body: String,
  recommend: Number,
  name: String,
  email: String,
  helpfulness: Number,
  report: Boolean,
  photos: [{
    id: Number,
    thumbnail_url: String,
    url: String,
  }],
  characteristics: {
    ratings: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
    },
    recommended: {
      0: Number,
      1: Number,
      null: Number,
    },
    characteristics: {
      Fit: {
        id: Number,
        value: Number,
      },
      Length: {
        id: Number,
        value: Number,
      },
      Comfort: {
        id: Number,
        value: Number,
      },
      Quality: {
        id: Number,
        value: Number,
      },
    },
  },
});
// compile schema into a Model. A model is a class with which we construct documents.
const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  Review,
};
