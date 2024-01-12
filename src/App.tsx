import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './StopwatchStyles.css';

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    // Store lap end times to calculate splits and totals
    const [lapEndTimes, setLapEndTimes] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!isRunning && interval) {
            clearInterval(interval);
        }
        return () => interval && clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
        if (!isRunning && time > 0) {
            // Starting again, add a new lap
            setLapEndTimes((prev) => [...prev, time]);
        }
    };

    const handleLapReset = () => {
        if (isRunning) {
            // Record the end time for the lap
            setLapEndTimes((prev) => [...prev, time]);
        } else {
            // Reset
            setTime(0);
            setLapEndTimes([]);
        }
    };

    // Function to format time for display
    const formatTime = (t: number) => {
        const minutes = Math.floor(t / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((t % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor((t % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    };

    // Calculate splits and total times
    const splitsAndTotals = lapEndTimes.map((endTime, index) => {
        const split = index === 0 ? endTime : endTime - lapEndTimes[index - 1];
        const total = endTime;
        return { split, total };
    });

    return (
        <div className="app-container">
            <StopWatch time={time} />

            {/* Laps Table */}
            <div className="laps-table">
                <div className="table-header">
                    <div className="header-lap-number">Lap No.</div>
                    <div className="header-split">Split</div>
                    <div className="header-total">Total</div>
                </div>
                <div className="table-content">
                    {splitsAndTotals.length === 0 ? (
                        <div className="table-row">
                            <div className="lap-number">-</div>
                            <div className="lap-split">-</div>
                            <div className="lap-total">-</div>
                        </div>
                    ) : (
                        splitsAndTotals.map((lap, index) => (
                            <div key={index} className="table-row">
                                <div className="lap-number">Lap {splitsAndTotals.length - index}</div>
                                <div className="lap-split">{formatTime(lap.split)}</div>
                                <div className="lap-total">{formatTime(lap.total)}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <StopWatchButton
                onPrimary={handleStartStop}
                onSecondary={handleLapReset}
                primaryLabel={isRunning ? "Stop" : "Start"}
                secondaryLabel={isRunning ? "Lap" : "Reset"}
                isRunning={isRunning}
                hasStarted={time !== 0}
            />
        </div>
    );
}