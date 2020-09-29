import React from 'react';
import { Row, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Sort = ({ func, currentSort }) => {
  return (
    <Row>
      <Dropdown>
        <Dropdown.Toggle variant="success">
          {currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => func('relevance')}>Relevance</Dropdown.Item>
          <Dropdown.Item onClick={() => func('helpful')}>Helpfulness</Dropdown.Item>
          <Dropdown.Item onClick={() => func('newest')}>Newest</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
};

Sort.propTypes = {
  func: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
};

export default Sort;
