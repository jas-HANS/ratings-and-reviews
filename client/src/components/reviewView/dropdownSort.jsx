import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

const Sort = ({ func, currentSort, reviews, len }) => {
  return (
    <div>
      <Row>
        <Col xs="3">
          <div className="review-sort-text">
            {`(${reviews.length}) Reviews, sorted by `}
          </div>
        </Col>
        <Col xs="7">
          <Dropdown className="sort-reviews-dropdown">
            <Dropdown.Toggle variant="secondary" className="sort-reviews-button">
              {currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="sort-reviews-item" onClick={() => func('relevance')}>Relevance</Dropdown.Item>
              <Dropdown.Item className="sort-reviews-item" onClick={() => func('helpful')}>Helpful</Dropdown.Item>
              <Dropdown.Item className="sort-reviews-item" onClick={() => func('newest')}>Newest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs="2">
          <div className="current-visible">
            {`(${len}) Currently visible.`}
          </div>
        </Col>
      </Row>
    </div>
  );
};

Sort.propTypes = {
  func: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  len: PropTypes.number.isRequired,
};

export default Sort;
