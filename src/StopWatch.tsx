import React from 'react';
import './StopwatchStyles.css';

interface StopWatchProps {
    time: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
    // Convert milliseconds into minutes, seconds, and remaining milliseconds
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);  // Divide by 10 to get two digits

    // Format time components to add leading zeros
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');

    // Combine time components into a single string
    const formattedTime = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;

    return (
        <div className="stopwatch-display">{formattedTime}</div>
    );
};

export default StopWatch;
