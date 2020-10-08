import React, { useState, useEffect } from 'react';
import Characteristic from './formCharacteristics';

const FormCharacteristics = ({ characteristics, data, change }) => {
  const [charData, changeCharData] = useState({});

  const handleChangeChar = (identity, info) => {
    const newObj = { ...charData };
    newObj[identity] = info;
    changeCharData(newObj); // ISSUE HERE WITH STATE REMAINING AN EMPTY OBJECT
  };

  useEffect(() => {
    change(charData);
  }, [charData]);

  return (
    <div>
      {characteristics[0] ? <Characteristic characteristic={characteristics[0]} data={data[characteristics[0]]} change={handleChangeChar} /> : ''}
      {characteristics[1] ? <Characteristic characteristic={characteristics[1]} data={data[characteristics[1]]} change={handleChangeChar} /> : ''}
      {characteristics[2] ? <Characteristic characteristic={characteristics[2]} data={data[characteristics[2]]} change={handleChangeChar} /> : ''}
      {characteristics[3] ? <Characteristic characteristic={characteristics[3]} data={data[characteristics[3]]} change={handleChangeChar} /> : ''}
      {characteristics[4] ? <Characteristic characteristic={characteristics[4]} data={data[characteristics[4]]} change={handleChangeChar} /> : ''}
      {characteristics[5] ? <Characteristic characteristic={characteristics[5]} data={data[characteristics[5]]} change={handleChangeChar} /> : ''}
      {characteristics[6] ? <Characteristic characteristic={characteristics[6]} data={data[characteristics[6]]} change={handleChangeChar} /> : ''}
    </div>
  );
};

export default FormCharacteristics;
