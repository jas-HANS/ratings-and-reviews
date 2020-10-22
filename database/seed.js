/* eslint-disable no-console */
const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');

const writeEntries = fs.createWriteStream('entries.json'); // creates json file
// writeEntries.write('', 'utf8'); // writes headers not needed with json file

// Function
const writeALot = (writer, encoding, callback) => {
  let i = 10000000; // number of items to write
  let product = 0;

  const write = () => {
    let ok = true;
    do {
      i -= 1;
      product += 1;

      // Generate reviewPhotos object
      const generatePhotos = () => {
        const photos = [];
        const random = Math.floor(Math.random() * Math.floor(6));
        for (let index = 0; index < random; index += 1) {
          photos.push(
            {
              _id: { $oid: mongoose.Types.ObjectId() },
              review_id: random, // how do I access the review_id
              url: faker.image.imageUrl(),
            },
          );
        }
        return photos;
      };

      // Generate review object
      // eslint-disable-next-line no-loop-func
      const generateReviews = () => {
        const reviews = [];
        const random = Math.floor(Math.random() * Math.floor(6));
        for (let index = 0; index < random; index += 1) {
          reviews.push(
            {
              _id: { $oid: mongoose.Types.ObjectId() },
              product_id: product,
              rating: random,
              date: faker.date.recent(),
              summary: faker.lorem.sentence(),
              body: faker.lorem.paragraph(),
              recommend: faker.random.boolean(),
              reported: faker.random.boolean(),
              reviewer_name: faker.internet.userName(),
              reviewer_email: faker.internet.email(),
              response: faker.lorem.sentence(),
              helpfulness: faker.random.number(),
              photos: generatePhotos(),
            },
          );
        }
        return reviews;
      };
      // Generate product
      const newEntry = JSON.stringify({
        _id: { $oid: mongoose.Types.ObjectId() },
        page: 0,
        count: 0,
        results: generateReviews(),
      });
      if (i === 0) {
        writer.write(newEntry, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(newEntry, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

writeALot(writeEntries, 'utf-8', () => {
  writeEntries.end();
});
