import React, { useState } from 'react';
import './formParticipants.css'

const FormParticipants = ({ onSubmit }) => {
  const [participants, setParticipants] = useState('');

  const handleChange = (e) => {
    setParticipants(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (participants && !isNaN(participants)) {
      onSubmit(Number(participants));
      setParticipants('');
    } else {
      alert('Por favor ingrese un número válido.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        id="participants"
        value={participants}
        onChange={handleChange}
        placeholder="Ingrese un número"
      />
      <button className="submit-btn" type="submit">Enviar</button>
    </form>
  );
};

export default FormParticipants;
