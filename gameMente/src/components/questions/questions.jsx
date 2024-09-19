import React, { useState, useEffect } from 'react';
import './questions.css';

function Questions({ category, question: propQuestion, onAnswer }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [question, setQuestion] = useState(propQuestion);

    useEffect(() => {
        if (propQuestion) {
            setQuestion(propQuestion);
        }
    }, [category, propQuestion]);

    const handleOptionChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedAnswer) {
            onAnswer(selectedAnswer);
        }
    };

    if (!question || !question.options) return <div>Cargando pregunta...</div>;

    return (
        <div className="question-container">
            <div className="points">6 puntos</div>
            <h2 className="question-text">{question.questionText}</h2>
            <form className="options-form">
                {question.options.map((option, index) => (
                    <div key={index} className="option-container">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="question"
                            value={option}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor={`option-${index}`} className="option-label">
                            {option}
                        </label>
                    </div>
                ))}
            </form>
            <button onClick={handleSubmit} className="submit-button" disabled={!selectedAnswer}>
                Enviar Respuesta
            </button>
        </div>
    );
}

export default Questions;
