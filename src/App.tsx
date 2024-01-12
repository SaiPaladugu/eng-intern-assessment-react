import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    // Effect hook for updating the stopwatch time.
    // Sets up an interval that updates the time state every 10 milliseconds when the stopwatch is running.
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    // Starts the stopwatch by setting isRunning to true.
    const handleStart = () => setIsRunning(true);

    // Stops the stopwatch by setting isRunning to false.
    const handleStop = () => setIsRunning(false);

    // Resets the stopwatch, clearing the time and laps, and stops the stopwatch.
    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    // Records the current time as a lap.
    const handleLap = () => setLaps(prevLaps => [...prevLaps, time]);

    return (
        <div>
            <StopWatch time={time} />
            <StopWatchButton 
                onStart={handleStart} 
                onStop={handleStop} 
                onReset={handleReset} 
                onLap={handleLap} 
                running={isRunning} 
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