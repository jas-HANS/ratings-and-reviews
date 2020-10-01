import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import query from '../../../lib/routes';
import ReviewList from './reviewList';
import Sort from './dropdownSort';

const ReviewView = ({ id, changeReviews }) => {
  const [reviews, getReviews] = useState([]); // State of reviews for current product
  const [seenReviews, changeSeen] = useState([]); // State of reviews shown on the page
  const [sort, changeSort] = useState('relevance');

  const [helpfulIds, changeHelpfulIds] = useState([]);
  const [reportedIds, changeReportedIds] = useState([]);

  // useEffect(() => {
  //   changeReviews(reviews, (data) => {
  //     changeSeen(data);
  //   });
  // });

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
              info = data.results.slice(0, 2);
            } else {
              info = data.results.slice(0, seenReviews.length);
            }
            changeSeen(info); // Set the initial seen reviews to be only two of the reviews
            // console.log('Starsort', starSort);
          }
        });
      }
    });
  }, [sort]);

  // useEffect(() => {
  //   console.log('new', sortStars); // DOes NOT get here
  // }, [starSort]);

  // Handle the changing of the dropdown menu
  const handleDropdownChange = (newSort) => {
    changeSort(newSort);
  };

  const handleAdd = (newId, kind) => {
    // const newArr = '';
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

  // useEffect(() => {
  //   if (!sortStars[0]) {
  //     // Keep our sorted array the same
  //     console.log('no sort for stars');
  //     changeSeen(seenReviews);
  //   } else {
  //     // Sort the reviews by only the rating in the starSort array
  //     const changeReviews = [];
  //     console.log('Has a sort for stars');
  //     sortStars.forEach((rating) => {
  //       for (let i = 0; i < reviews.length; i += 1) {
  //         if (reviews[i].rating === rating) {
  //           changeReviews.push(reviews[i]); // Add the reviews to the new reviews list
  //         }
  //       }
  //     });
  //     changeSeen(changeReviews);
  //   }
  //   // Adding a filter somewhere to show it is filtered
  // }, [sortStars]);
  return (
    <Container className="review-view">
      <Sort func={handleDropdownChange} currentSort={sort} reviews={reviews} />
      <Col>
        <Row>
          <ReviewList reviews={seenReviews} help={helpfulIds} report={reportedIds} change={handleAdd} />
        </Row>
        <Row className="more-reviews">
          {reviews.length === seenReviews.length
            ? <button type="button" className="more-reviews-button" onClick={() => changeSeen(reviews.slice(0, 2))}>Less Reviews</button>
            : <button type="button" className="more-reviews-button" onClick={() => changeSeen(reviews.slice(0, seenReviews.length + 2))}>More Reviews</button> }
          <div className="current-visible">
            {`(${seenReviews.length} Currently shown)`}
          </div>
        </Row>
      </Col>
    </Container>
  );
};

ReviewView.propTypes = {
  starSort: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  id: PropTypes.number.isRequired,
};

export default ReviewView;

