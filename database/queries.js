const mongoose = require('mongoose');

// Set up the default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/SDC';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Assign a default connection

// Assign an alias to a mongoose schema

// Queries: product, reviews, metadata

// product http://52.26.193.201:3000/:product_id/list
// set productSchema to a new schema
//  product_id: number
//  !! This will have a relationship with metadata. Metadata is associated to the product_id.
//  results: array
//  !! This will have a relationship with reviews. Reviews are the objects within the results array.

// reviews
// set reviewsSchema to a new schema
//  QUESTION: Should I add a product_id so that I can reference the correct product?
//     After looking at how a review is created I don't think this will be detrimental if added
//  product_id: number
//  review_id: number
//  rating: number
//  summary: string
//  recommend: number
//  response: string
//  body: string
//  date: string
//  reviewer_name: string
//  helpfulness: number
//  photos: array of objects

// metadata http://52.26.193.201:3000/:product_id/meta
// set metadataSchema to a new schema
//  product_id: number !! This product_id comes from the productSchema
//  ratings: object
//  recommended: object
//  characteristics: object

// set models
