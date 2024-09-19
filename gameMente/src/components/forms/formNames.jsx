import React, { useState } from 'react';
import './formNames.css';

const FormNames = ({ numParticipants, onSubmit }) => {
  const [names, setNames] = useState(Array(numParticipants).fill(''));

  const handleNameChange = (index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(names);
  };

  return (
    <form onSubmit={handleSubmit}>
      {names.map((name, index) => (
        <div key={index}>
          <label htmlFor={`participant-${index}`}>Participante {index + 1}:</label>
          <input
            type="text"
            id={`participant-${index}`}
            value={name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            placeholder={`Ingrese el nombre del participante ${index + 1}`}
            required
          />
        </div>
      ))}
      <button className="submit-btn" type="submit">Enviar Nombres</button>
    </form>
  );
};

export default FormNames;
