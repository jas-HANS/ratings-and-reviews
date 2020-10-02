import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import query from '../../../lib/routes';
import ReviewList from './reviewList';
import Sort from './dropdownSort';
import { ProgressBar } from 'react-bootstrap';

const ReviewView = ({ id, starSortArray }) => {
  const [reviews, getReviews] = useState([]); // State of reviews for current product
  const [seenReviews, changeSeen] = useState([]); // State of reviews shown on the page
  const [shownReviews, changeShown] = useState([]);
  const [sort, changeSort] = useState('relevance');

  const [showLess, setShowLess] = useState(false);
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
            changeSeen(data.results);
            let info;
            if (shownReviews.length === 0) {
              if (!starSortArray[0]) {
                info = data.results.slice(0, 2);
              } else {
                info = sortByFilter(data.results);
              }
            } else if (!starSortArray[0]) {
              info = data.results.slice(0, shownReviews.length);
            } else {
              info = sortByFilter(data.results.slice(0, shownReviews.length));
            }
            // What if sort changes and there are filter options
            changeShown(info);
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
      changeSeen(newArray);
      if (shownReviews.length === 0 || shownReviews.length === 1) {
        changeShown(newArray.slice(0, 2));
      } else {
        changeShown(newArray.slice(0, shownReviews.length));
      }
    } else {
      changeSeen(reviews);
      if (shownReviews.length === 1 || shownReviews.length === 2) {
        changeShown(reviews.slice(0, 2));
      } else {
        changeShown(reviews.slice(0, shownReviews.length));
      }
    }
  }, [starSortArray]);

  useEffect(() => {
    if (seenReviews.length <= 2 && seenReviews.length === shownReviews.length) {
      // Set boolean to true
      setShowLess(true);
    } else {
      // Set boolean to false
      setShowLess(false);
    }
  });

  const showButton = showLess
    ? ''
    : <button type="button" className="more-reviews-button" onClick={() => changeShown(seenReviews.slice(0, 2))}>Less Reviews</button>;

  return (
    <Container className="review-view">
      <Sort func={handleDropdownChange} currentSort={sort} reviews={reviews} />
      <Col>
        <Row>
          <ReviewList reviews={shownReviews} help={helpfulIds} report={reportedIds} change={handleAdd} />
        </Row>
        <Row className="more-reviews">
          {seenReviews.length === shownReviews.length
            ? showButton
            : <button type="button" className="more-reviews-button" onClick={() => changeShown(seenReviews.slice(0, shownReviews.length + 2))}>More Reviews</button> }
          <div className="current-visible">
            {`(${shownReviews.length} Currently shown)`}
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default ReviewView;

