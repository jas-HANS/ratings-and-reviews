import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Col from 'react-bootstrap/Col';

import SingleProductBreakdown from './singleProduct';

import query from '../../../lib/routes';

const ProductBreakdown = ({ id }) => {
  const [characteristics, changeChars] = useState([]);
  const [values, changeValues] = useState([]);

  useEffect(() => {
    query.getCharacteristics(id, (err, info) => {
      if (err) {
        throw err;
      } else {
        // console.log(info);
        changeChars(Object.keys(info));
        const newArr = [];
        for (let i = 0; i < Object.keys(info).length; i += 1) {
          newArr.push(info[Object.keys(info)[i]].value);
        }
        changeValues(newArr);
      }
    });
  }, [id]);

  return (
    <Col className="product-breakdown-container">
      {characteristics.map((breakdown, i) => <SingleProductBreakdown key={uuidv4()} char={breakdown} data={values[i]} />)}
    </Col>
  );
};

ProductBreakdown.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProductBreakdown;
