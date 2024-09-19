import React, { useState, useEffect } from 'react';
import "./timeBar.css"

const TimerBar = ({ duration, onTimeUp, points }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    const progress = (timeLeft / duration) * 100;

    return (
        <div className="timer-container">
            <div className="timer-bar">
                <div
                    className="timer-progress"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progress > 0 ? 'red' : 'gray',
                    }}
                />
            </div>
            <div className="timer-info">
                <span role="img" aria-label="timer">⏱️</span>
                <span>{`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}</span>
            </div>
            <div className="question-points">
                {`Puntos: ${points}`}
            </div>
        </div>
    );
};

export default TimerBar;
