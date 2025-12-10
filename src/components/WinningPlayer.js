import React from "react";

function BarChart({ amount, total }) {
    let percentage = (amount / total) * 100;
    return (
        <div className="h-4 bg-slate-800 w-full rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
        </div>
    );
}

export default function WinningPlayer({ playerName, correctAnswers, totalAnswers }) {
    return (
        <div className="flex flex-col gap-4 mb-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
                <i className="fas fa-trophy text-yellow-500 text-3xl"></i>
                <h1 className="text-3xl font-bold text-white">Winner: {playerName}</h1>
            </div>

            <div className="space-y-2">
                <BarChart
                    amount={correctAnswers}
                    total={totalAnswers}
                />
                <p className="text-right text-slate-400 font-medium">{correctAnswers} Correct / {totalAnswers} Total</p>
            </div>
        </div>
    );
}