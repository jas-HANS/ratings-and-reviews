import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import query from '../../../lib/routes';
import ReviewList from './reviewList';
import Sort from './dropdownSort';

const ReviewView = ({ id, starSortArray }) => {
  const [reviews, getReviews] = useState([]); // State of reviews for current product
  const [seenReviews, changeSeen] = useState([]); // State of reviews shown on the page
  // const [filteredReviews, changeFilter] = useState([]);
  const [sort, changeSort] = useState('relevance');

  const [helpfulIds, changeHelpfulIds] = useState([]);
  const [reportedIds, changeReportedIds] = useState([]);

  const sortByFilter = (reviewsToSort) => {
    if (starSortArray[0]) {
      const changeReviews = [];
      starSortArray.forEach((rating) => {
        for (let i = 0; i < reviewsToSort.length; i += 1) {
          if (reviewsToSort[i].rating === rating) {
            changeReviews.push(reviewsToSort[i]); // Add the reviews to the new reviews list
          }
        }
      });
      return changeReviews;
    }
    return reviewsToSort;
  };

  useEffect(() => { // Sets the initial state of reviews and seenReviews
    query.getRatingTotals(id, (error, ratings) => {
      if (error) {
        throw error;
      } else {
        // Here do the math to calculate how many total reviews there are.
        let total = 0;
        const values = Object.values(ratings);
        values.forEach((value) => { total += value; });
        query.searchReviews(sort, id, total, (err, data) => { // Get the reviews with that total
          if (err) {
            throw err;
          } else {
            getReviews(data.results); // Set the reviews state to the data from the axios request
            let info;
            if (seenReviews.length === 0) {
              if (!starSortArray[0]) {
                info = data.results.slice(0, 2);
              } else {
                info = sortByFilter(data.results);
              }
            } else if (!starSortArray[0]) {
              info = data.results.slice(0, seenReviews.length);
            } else {
              info = sortByFilter(data.results.slice(0, seenReviews.length));
            }
            // What if sort changes and there are filter options
            changeSeen(info);
          }
        });
      }
    });
  }, [sort]);

  // Handle the changing of the dropdown menu
  const handleDropdownChange = (newSort) => {
    changeSort(newSort);
  };

  const handleAdd = (newId, kind) => {
    if (kind === 'help') {
      const newArr = helpfulIds;
      newArr.push(newId);
      changeHelpfulIds(newArr);
    } else {
      const newArr = reportedIds;
      newArr.push(newId);
      changeReportedIds(newArr);
    }
  };

  useEffect(() => {
    if (starSortArray[0]) {
      const newArray = sortByFilter(reviews);
      newArray.slice(0, 2);
      changeSeen(newArray);
    } else {
      changeSeen(reviews.slice(0, 2));
    }
  }, [starSortArray]);

  return (
    <Container className="review-view">
      <Sort func={handleDropdownChange} currentSort={sort} reviews={reviews} />
      <Col>
        <Row>
          <ReviewList reviews={seenReviews} help={helpfulIds} report={reportedIds} change={handleAdd} />
        </Row>
        <Row className="more-reviews">
          {reviews.length === seenReviews.length
            ? <button type="button" className="more-reviews-button" onClick={() => changeSeen(sortByFilter(reviews).slice(0, 2))}>Less Reviews</button>
            : <button type="button" className="more-reviews-button" onClick={() => changeSeen(sortByFilter(reviews).slice(0, seenReviews.length + 2))}>More Reviews</button> }
          <div className="current-visible">
            {`(${seenReviews.length} Currently shown)`}
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default ReviewView;

