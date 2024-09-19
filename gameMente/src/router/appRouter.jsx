import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "../windows/start/start";
import AddParticipants from "../windows/addParticipants/addParticipants";
import AddNames from "../windows/addNames/addNames";
import Begin from "../windows/Begin/begin";
import Game from "../windows/game/game";



export function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Start/>} />
            <Route path="/addParticipants" element={<AddParticipants/>} />
            <Route path="/addNames" element={<AddNames/>} />
            <Route path="/begin" element={<Begin/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/*" element={<h1>404</h1>} />
        </Routes>
    );
}