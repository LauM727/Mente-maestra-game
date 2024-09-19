import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Logoimg from "../../assets/logoimg.png";
import "./begin.css";
import addP from '../../assets/addP.png';

function Begin() {
    const navigate = useNavigate();
    const location = useLocation();
    const { participantNames } = location.state || { participantNames: [] };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/game', { state: { participants: participantNames } });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate, participantNames]);

    return (
        <div className="beginWindow" style={{ backgroundImage: `url(${addP})`, backgroundSize: 'cover' }}>
            <div className="begin-screen">
            <img className="logo" src={Logoimg} alt="Logo" />
            <h2>¡Comencemos!</h2>
            </div>
        </div>
    );
}

export default Begin;
