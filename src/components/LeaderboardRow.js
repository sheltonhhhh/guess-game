import React from "react";

export default function LeaderboardRow({ playerName, correctAnswers }) {

    return (
        <div className="flex flex-row justify-between items-center p-4 bg-slate-900 border border-slate-800 rounded-lg">
            <p className="text-lg font-bold text-white">{playerName}</p>
            <p className="text-slate-400 text-sm">Correct Answers: <span className="text-white font-bold ml-1">{correctAnswers}</span></p>
        </div>
    )
}