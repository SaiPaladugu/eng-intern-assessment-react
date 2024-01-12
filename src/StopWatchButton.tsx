import React from 'react';

interface StopWatchButtonProps {
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
    running: boolean;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onStart, onStop, onReset, onLap, running }) => {
    return (
        <div>
            {!running && <button onClick={onStart}>Start</button>}
            {running && <button onClick={onStop}>Stop</button>}
            <button onClick={onReset}>Reset</button>
            <button onClick={onLap}>Lap</button>
        </div>
    );
};

export default StopWatchButton;