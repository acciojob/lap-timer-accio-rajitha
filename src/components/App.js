import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';

const App = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 6000);
        const seconds = Math.floor((time / 100) % 60);
        const centiseconds = time % 100;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${centiseconds < 10 ? '0' : ''}${centiseconds}`;
    };

    const startTimer = () => {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 10);
    };

    const stopTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    const resetTimer = () => {
        setTime(0);
        setLaps([]);
        clearInterval(intervalRef.current);
    };

    const recordLap = () => {
        setLaps((prevLaps) => [...prevLaps, time]);
    };

    return (
        <div className="app">
            <div className="timer">{formatTime(time)}</div>
            <div className="controls">
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={recordLap}>Lap</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="laps">
                <ul>
                    {laps.map((lapTime, index) => (
                        <li key={index}>{formatTime(lapTime)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
