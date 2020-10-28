/* eslint-disable camelcase */
const faker = require('faker');

// id,product_id,rating,date,summary,body,recommend,reported,
//    reviewer_name,reviewer_email,response,helpfulness
const createReview = () => {
  const product_id = faker.random.number(10000);
  const rating = faker.random.number(5);
  const date = JSON.stringify(faker.date.between('2020-01-01', '2020-12-12'));
  const summary = faker.lorem.paragraph();
  const body = faker.lorem.sentence();
  const recommend = faker.random.boolean();
  const reported = faker.random.boolean();
  const reviewer_name = faker.name.firstName();
  const reviewer_email = faker.internet.email();
  const response = faker.lorem.sentence();
  const helpfulness = faker.random.number(30);

  return `${product_id}, ${rating}, ${date}, ${summary}, ${body}, ${recommend}, ${reported}, ${reviewer_name}, ${reviewer_email}, ${response}, ${helpfulness}\n`;
};

// id,review_id,url
const createPhoto = () => {
  const reviewId = faker.random.number({
    min: 1,
    max: 10000,
  });
  const url = JSON.stringify(faker.image.imageUrl(640, 480, 'fashion', true));

  return `${reviewId}, ${url}\n`;
};

module.exports = {
  createReview, createPhoto,
};
