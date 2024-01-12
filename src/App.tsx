import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => interval && clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleLapReset = () => {
        if (isRunning) {
            // When running, it records a lap.
            setLaps(prevLaps => [...prevLaps, time]);
        } else {
            // When not running, it resets the stopwatch.
            setTime(0);
            setLaps([]);
        }
    };

    return (
        <div>
            <StopWatch time={time} />
            <StopWatchButton 
                onPrimary={handleStartStop} 
                onSecondary={handleLapReset} 
                primaryLabel={isRunning ? "Stop" : "Start"}
                secondaryLabel={isRunning ? "Lap" : "Reset"}
                isRunning={isRunning} 
                hasStarted={time !== 0}
            />
            {/* Renders a list of recorded laps, if any */}
            {laps.length > 0 && (
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>Lap {index + 1}: {lap} ms</li>
                    ))}
                </ul>
            )}
        </div>
    );
}