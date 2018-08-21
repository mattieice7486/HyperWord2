
import React from "react";
import "./ScoreRow.css";

const ScoreRow = props => {
return (
    <tr>
        <td><span>{props.user.rank}</span></td>
        <td><span>{props.user.username}</span></td>
        <td><span>{props.user.roundsCompleted}</span></td>
        <td><span>{props.user.score}</span></td>
    </tr>
)
};

export default ScoreRow;