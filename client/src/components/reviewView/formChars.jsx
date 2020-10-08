import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Characteristic from './formCharacteristics';

const FormCharacteristics = ({ characteristics, data, change }) => {
  return (
    <div>
      {characteristics.map((char) => (
        <Characteristic key={uuidv4()} characteristic={char} data={data[char]} change={change} />
      ))}
    </div>
  );
};

export default FormCharacteristics;
