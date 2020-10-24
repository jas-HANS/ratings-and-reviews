/* eslint-disable no-console */
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

// id,product_id,rating,date,summary,body,recommend,reported,
//  reviewer_name,reviewer_email,response,helpfulness
const reviewSchema = new mongoose.Schema({
  product_id: Number,
  // rating: Number,
  // date: String,
  summary: String,
  // body: String,
  // recommend: Boolean,
  // reported: Boolean,
  // reviewer_name: String,
  // reviewer_email: String,
  // response: String,
  // helpfulness: Number,
});
// compile schema into a Model. A model is a class with which we construct documents.
const Review = mongoose.model('Review', reviewSchema);

// const review = new Review({
//   product_id: 90000,
//   summary: 'Summary String2',
// }).save((error, response) => {
//   console.log('error within save', error, 'response within save', response);
// });

console.log('hello');
// Review.findOne({ product_id: 90000 }, (response, error) => {
//   console.log('response in model', response, 'and error', error);
// });

// module.exports = Review;
