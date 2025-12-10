import React from 'react';

const TransitionScreen = ({ currentPlayer, onProceed }) => {
    return (
        <div className="transition-screen">
            <h2 className='h1 pb-4'>Get ready for the next turn!</h2>
            <h3 className='h3'>Current Player: {currentPlayer}</h3>
            <p className='body-medium pb-6'>Get ready for the next turn...</p>
            <button onClick={onProceed}>Proceed to Next Turn</button>
        </div>
    );
};

export default TransitionScreen;