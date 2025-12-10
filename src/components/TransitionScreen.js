import React from 'react';

const TransitionScreen = ({ currentPlayer, onProceed }) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 p-6 animate-fade-in text-center">
            <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center gap-6">
                <div className="h-16 w-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-2">
                    <i className="fas fa-hourglass-half text-blue-500 text-3xl animate-pulse"></i>
                </div>

                <div className="space-y-2">
                    <h2 className='text-3xl font-bold text-white'>Get Ready!</h2>
                    <p className='text-slate-400'>Pass the device to the next player</p>
                </div>

                <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Next Up</p>
                    <h3 className='text-2xl font-bold text-blue-400'>{currentPlayer}</h3>
                </div>

                <div className="pt-2 w-full">
                    <button
                        onClick={onProceed}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
                    >
                        <span>Start Turn</span>
                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransitionScreen;