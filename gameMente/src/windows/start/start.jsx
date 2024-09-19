import React from "react";
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png"
import "./start.css"

function Start (){
    const navigate = useNavigate();

     useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/addParticipants');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

return (
    <div className="start-screen">
        <img className="logo" src={Logo}></img>
    </div>
)
}

export default Start