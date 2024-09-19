import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormNames from '../../components/forms/formNames';
import Logo from '../../assets/logo.png';
import addP from '../../assets/addP.png';
import "./addNames.css";

function AddNames() {
    const location = useLocation();
    const navigate = useNavigate();
    const { numParticipants } = location.state;
    const [participantNames, setParticipantNames] = useState([]);
    const [namesSubmitted, setNamesSubmitted] = useState(false);

    const handleNamesSubmit = (names) => {
        setParticipantNames(names);
        setNamesSubmitted(true);
        navigate('/begin', { state: { participantNames: names } });
    };

    return (
        <div 
            className="addPWindow"
            style={{ backgroundImage: `url(${addP})`, backgroundSize: 'cover' }}
        >
            <div className="add-names">
            <img className="logo" src={Logo} alt="Logo" />
            <h1>Ingresa los nombres de los {numParticipants} participantes</h1>
            {!namesSubmitted ? (
                <FormNames numParticipants={numParticipants} onSubmit={handleNamesSubmit} />
            ) : (
                <div>
                    <h2>Nombres ingresados:</h2>
                    <ul>
                        {participantNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            )}
            </div>
        </div>
    );
}

export default AddNames;
