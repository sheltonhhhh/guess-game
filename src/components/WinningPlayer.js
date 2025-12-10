import React from "react";

function BarChart({amount, total}) {
    let percentage = (amount / total) * 100;
    //console.log("Amount: ",amount, "Total: ", total);
    return (
        <div className="bar-chart-outer h-6 bg-bgLightPrimary w-full">
            <div className="bar-chart-inner h-6 bg-limeGreen" style={{ width: `${percentage}%` }}></div>
        </div>
    );
}

export default function WinningPlayer({playerIndex, correctAnswers, totalAnswers}) {
    
    console.log("In winningplayer component", totalAnswers)
    return (
        <div className="Winning-player flex flex-col gap-6 mb-10">
            <h1 className="h1">Winner: {playerIndex}</h1>
            <BarChart 
                amount={correctAnswers}
                total={totalAnswers}
            />
            <p className="h3">{correctAnswers} Correct Answers</p>
        </div>
    );
}