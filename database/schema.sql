DROP DATABASE IF EXISTS review_data;

CREATE DATABASE review_data;

USE review_data;

-- id,product_id,rating,date,summary,body,recommend,reported,
-- reviewer_name,reviewer_email,response,helpfulness
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date TIMESTAMP,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT,
  helpfulness INT
);

-- id,review_id,url
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL AUTO_INCREMENT NOT NULL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR(255),
  CONSTRAINT review_id FOREIGN KEY (review_id)
    REFERENCES reviews (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES (1, 5, "Test Summary", "Test Body", true, "Tester McTesting", "Testing@test.com");
INSERT INTO photos (review_id, url) VALUES (1, "http://placeimg.com/200/200");

-- LOAD DATA INFILE 'path.csv' 
-- INTO TABLE reviews 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA INFILE 'path.csv' 
-- INTO TABLE photos 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;
