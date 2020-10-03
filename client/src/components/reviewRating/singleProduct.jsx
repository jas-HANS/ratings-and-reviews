import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

const SingleProductBreakdown = ({ char, data }) => {
  const [currentName, changeName] = useState('');
  const [percent, changePercent] = useState(0);
  const [label, changeLabel] = useState([]);
  const [labelRow, changeLabelRow] = useState(<div />);

  useEffect(() => {
    changeName(char);
    const percentage = ((Number(data) / 5)) * 100;
    changePercent(percentage);
    if (currentName === 'Fit' || currentName === 'Size') {
      changeLabel(['Too small', 'Perfect', 'Too large']);
    } else if (currentName === 'Quality' || currentName === 'Comfort') {
      changeLabel(['Poor', 'Perfect']);
    } else if (currentName === 'Length' || currentName === 'Width') {
      changeLabel(['Too short', 'Perfect', 'Too long']);
    }
  }, [data, char, currentName]);

  useEffect(() => {
    if (label.length !== 0) {
      changeLabelRow(
        <Row className="label-row">
          <Col className="label-row-col">
            {label[0]}
          </Col>
          <Col className="label-row-col">
            {label[1]}
          </Col>
          {label.length === 3 ? (
            <Col className="label-row-col">
              {label[2]}
            </Col>
          ) : ''}
        </Row>,
      );
    }
  }, [label]);

  return (
    <Row className="container-breakdown-single">
      <Col>
        <Row className="product-bar-name-row">
          <h4 className="product-breakdown-name">{currentName}</h4>
        </Row>
        {labelRow}
        <Row className="product-bar-row">
          <ProgressBar className="product-bars" now={percent} />
        </Row>
      </Col>
    </Row>
  );
};

SingleProductBreakdown.propTypes = {
  char: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default SingleProductBreakdown;
