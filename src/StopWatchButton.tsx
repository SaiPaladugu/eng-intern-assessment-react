import React from 'react';
import './StopwatchStyles.css';

interface StopWatchButtonProps {
    onPrimary: () => void;
    onSecondary: () => void;
    primaryLabel: string;
    secondaryLabel: string;
    isRunning: boolean;
    hasStarted: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({
    onPrimary,
    onSecondary,
    primaryLabel,
    secondaryLabel,
    isRunning,
    hasStarted,
}) => {
    return (
        <div className="buttons-container">
            {/* Always display the Lap or Reset button first */}
            <button 
                className={`button ${isRunning ? 'lap-button' : 'reset-button'}`}
                onClick={onSecondary} 
                disabled={!isRunning && !hasStarted}
            >
                {isRunning ? "Lap" : "Reset"}
            </button>

            {/* Display the Start or Stop button second */}
            <button 
                className={`button ${isRunning ? 'stop-button' : 'start-button'}`} 
                onClick={onPrimary}
            >
                {isRunning ? "Stop" : "Start"}
            </button>
        </div>
    );
};

export default StopWatchButton;