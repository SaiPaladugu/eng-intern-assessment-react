import React from 'react';

interface StopWatchProps {
    time: number;
}

const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
    return (
        <div>{time} ms</div>
    );
};

export default StopWatch;