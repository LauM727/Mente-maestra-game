import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Questions from '../../components/questions/questions';
import CategorySelection from '../../components/category/category';
import TimerBar from '../../components/timeBar/timeBar';
import questionsData from '../../data/data';
import addP from '../../assets/addP.png';
import "./game.css";

function Game() {
    const location = useLocation();
    const { participants } = location.state || {};

    if (!participants || participants.length === 0) {
        return <h1 className='error'>Error: No se encontraron participantes.</h1>;
    }

    const WINNING_SCORE = 100;

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [scores, setScores] = useState(Array(participants.length).fill(0));
    const [categorySelected, setCategorySelected] = useState(null);
    const [questionValue, setQuestionValue] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const [stealAttempt, setStealAttempt] = useState(false);
    const [stealPlayerIndex, setStealPlayerIndex] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [incorrectQuestion, setIncorrectQuestion] = useState(null);
    const [usedQuestions, setUsedQuestions] = useState([]);

    const handleCategorySelection = (category) => {
        setCategorySelected(category);
        setQuestionValue(10);

        if (category && questionsData[category] && questionsData[category].length > 0) {

            const categoryQuestions = questionsData[category].filter(
                question => !usedQuestions.includes(question.questionText)
            );

            if (categoryQuestions.length > 0) {
                const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
                setCurrentQuestion(randomQuestion);

                setUsedQuestions([...usedQuestions, randomQuestion.questionText]);
            } else {
                console.error(`No quedan más preguntas disponibles para la categoría ${category}`);
                setCurrentQuestion(null);
            }
        } else {
            console.error(`No hay preguntas disponibles para la categoría ${category}`);
            setCurrentQuestion(null);
        }

        const randomPoints = Math.floor(Math.random() * 6) + 5;
        setQuestionValue(randomPoints);
    };

    const checkForWinner = (scores) => {
        return scores.some(score => score >= WINNING_SCORE);
    };

    const handleAnswer = (answer) => {
        let newScores = [...scores];

        if (categorySelected === "Retos") {
            if (answer === currentQuestion.correctAnswer) {
                newScores = newScores.map(score => score + questionValue);
            } else {
                newScores = newScores.map(score => score - questionValue);
            }
            setScores(newScores);

            if (checkForWinner(newScores)) {
                setGameOver(true);
            } else {
                setCategorySelected(null);
                setCurrentPlayerIndex((currentPlayerIndex + 1) % participants.length);
                setTimeRemaining(30);
            }
            return;
        }

        if (answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
            newScores[currentPlayerIndex] += questionValue;
        } else {
            newScores[currentPlayerIndex] -= questionValue;
            setIncorrectQuestion(currentQuestion);
            setStealAttempt(true);
            setStealPlayerIndex(currentPlayerIndex);
            return;
        }

        setScores(newScores);

        if (checkForWinner(newScores)) {
            setGameOver(true);
        } else {
            setCategorySelected(null);
            setCurrentPlayerIndex((currentPlayerIndex + 1) % participants.length);
            setTimeRemaining(30);
        }
    };

    const handleStealAnswer = (playerIndex, answer) => {
        let newScores = [...scores];
        const normalizedAnswer = (answer || '').trim().toLowerCase();
        const correctAnswer = (incorrectQuestion?.correctAnswer || '').trim().toLowerCase();

        if (normalizedAnswer === correctAnswer) {
            newScores[playerIndex] += questionValue;
        } else {
            newScores[playerIndex] -= questionValue * 2;
        }

        setScores(newScores);

        if (checkForWinner(newScores)) {
            setGameOver(true);
        } else {
            setStealAttempt(false);
            setStealPlayerIndex(null);
            setCategorySelected(null);
            setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % participants.length);
            setTimeRemaining(30);
        }
    };

    const handleStealAttempt = (playerIndex) => {
        setStealPlayerIndex(playerIndex);
        setStealAttempt(false);
    };

    const handleTimeUp = () => {
        handleAnswer("incorrecto");
    };

    useEffect(() => {
        if (timeRemaining > 0 && !gameOver && categorySelected && !stealAttempt) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && categorySelected && !stealAttempt) {
            handleTimeUp();
        }
    }, [timeRemaining, gameOver, categorySelected, stealAttempt]);

    useEffect(() => {
        if (stealAttempt && timeRemaining > 0 && !gameOver) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && stealAttempt) {
            handleTimeUp();
        }
    }, [timeRemaining, gameOver, stealAttempt]);

    useEffect(() => {
        if (stealAttempt) {
            setTimeRemaining(30);
        }
    }, [stealAttempt]);

    useEffect(() => {
        if (stealPlayerIndex !== null && incorrectQuestion) {
            setCurrentQuestion(incorrectQuestion);
        }
    }, [stealPlayerIndex, incorrectQuestion]);

    if (gameOver) {
        return <h1>¡{participants[currentPlayerIndex]} ha ganado!</h1>;
    }

    return (
        <div className="game-screen"
            style={{ backgroundImage: `url(${addP})`, backgroundSize: 'cover' }}>
            <h1>Turno de {participants[currentPlayerIndex]}</h1>

            {stealAttempt ? (
                <div className="steal-screen">
                    <h2>¿Quién quiere robar los puntos?</h2>
                    <p>Recuerda: si respondes mal, se te restará el doble de puntos.</p>
                    <ul>
                        {participants.map((player, index) => (
                            index !== currentPlayerIndex && (
                                <li key={index}>
                                    <button onClick={() => handleStealAttempt(index)}>
                                        {player}
                                    </button>
                                </li>
                            )
                        ))}
                        <li>
                            <button onClick={() => handleStealAnswer(null, false)}>
                                Ninguno
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <>
                    {categorySelected || stealPlayerIndex !== null ? (
                        <>
                            <TimerBar duration={30} onTimeUp={handleTimeUp} points={questionValue} />
                            <Questions
                                category={categorySelected}
                                question={currentQuestion}
                                onAnswer={(answer) => {
                                    if (stealPlayerIndex === null) {
                                        handleAnswer(answer);
                                    } else {
                                        handleStealAnswer(stealPlayerIndex, answer);
                                    }
                                }}
                                questionValue={questionValue}
                            />

                        </>
                    ) : (
                        <CategorySelection onSelectCategory={handleCategorySelection} />
                    )}
                </>
            )}

            {!categorySelected && stealPlayerIndex === null && (
                <div className="scoreboard">
                    <h2>Puntajes</h2>
                    {participants.map((player, index) => (
                        <div key={index}>
                            <p>{player}: {scores[index]} puntos</p>
                        </div>
                    ))}
                    </div>
            )}
        </div>
    );
}

export default Game;
