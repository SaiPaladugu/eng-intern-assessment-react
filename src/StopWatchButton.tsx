import React from 'react';

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
    const buttonStyle = {
        // Define your button styles here
    };

    return (
        <div>
            <button onClick={onPrimary} style={buttonStyle}>
                {primaryLabel}
            </button>
            <button onClick={onSecondary} style={buttonStyle} disabled={!isRunning && !hasStarted}>
                {secondaryLabel}
            </button>
        </div>
    );
};

export default StopWatchButton;