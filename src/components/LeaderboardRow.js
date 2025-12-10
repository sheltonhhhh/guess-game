import React from "react";

export default function LeaderboardRow({playerIndex, correctAnswers}) {

    return (
        <div className="leaderboard-row">
        <p className="h4 ">Player {playerIndex}</p>
        <p className="textLightPrimary body-small">Correct Answers: <span className="body-small-strong">{correctAnswers}</span></p>
        </div>
    )
}