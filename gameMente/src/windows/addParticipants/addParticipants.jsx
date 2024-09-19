import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import addP from '../../assets/addP.png';
import FormParticipants from '../../components/forms/formParticipants';
import "../../components/forms/formParticipants.css"
import "./addParticipants.css";

function AddParticipants() {
    const navigate = useNavigate();
    const [numParticipants, setNumParticipants] = useState(null);

    const handleParticipantsSubmit = (number) => {
        setNumParticipants(number);
        navigate('/addNames', { state: { numParticipants: number } });
    };

    return (
        <div 
            className="addPWindow"
            style={{ backgroundImage: `url(${addP})`, backgroundSize: 'cover' }}
        >
            <div className="add-person">
                <img className="logo" src={Logo} alt="Logo" />
                <h1>Ingresa el número de participantes</h1>
                <FormParticipants onSubmit={handleParticipantsSubmit} />
            </div>
        </div>
    );
}

export default AddParticipants;
