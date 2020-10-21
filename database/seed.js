/* eslint-disable no-unused-vars */
import faker from 'faker';
import mongoose from 'mongoose';
import fs from 'fs';

const writeEntries = fs.createWriteStream('entries.json');
writeEntries.write('', 'utf8');

// Faker API Methods To Use
// Review
//   product_id: faker.random.number()
const product = faker.random.number();
//   rating: faker.random.number() // needs to be a num 1-5
const rating = faker.random.number();
//   date: faker.date.recent()
const date = faker.date.recent();
//   summary: faker.lorem.sentence()
const summary = faker.lorem.sentence();
//   body: faker.lorem.paragraph()
const body = faker.lorem.paragraph();
//   recommend: faker.random.boolean()
const recommend = faker.random.boolean();
//   reported: faker.random.boolean()
const reported = faker.random.boolean();
//   reviewer_name: faker.username()
const reviewer = faker.username();
//   reviewer_email: faker.email()
const email = faker.email();
//   response: faker.lorem.sentence()
const response = faker.lorem.sentence();
//   helpfulness: faker.random.number()
const helpfulness = faker.random.number();
// ReviewPhotos
//   review_id: faker.random.number()
const review = faker.random.number();
//   url: faker.imageUrl()
const url = faker.imageUrl();
// Characteristics
//   product_id: faker.random.number()
//   name: faker.productAdjective()
const name = faker.productAdjective();
// CharacteristicsReviews
//   characteristic_id: faker.random.number()
const characteristic = faker.random.number();
//   review_id: faker.random.number()
//   value: faker.random.number()
const value = faker.random.number();
