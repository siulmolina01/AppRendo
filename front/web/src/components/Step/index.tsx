import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import './styles.css';

const Step = () => {
  const [instruction, setInstruction] = useState('');

  return (
    <div className="pasoCompleto mb-4">
      <Form.Control
        className="instruccion mb-2"
        type="text"
        placeholder="Introduzca las instrucciones"
        value={instruction}
        onChange={({target: {value}}) => setInstruction(value)}
      />
      <div className="imagen">
        <Form.Control
          className="imagenesInstruccion"
          type="file"
          placeholder="Selecciona una imagen"
        />
      </div>
    </div>
  );
};

export default Step;
