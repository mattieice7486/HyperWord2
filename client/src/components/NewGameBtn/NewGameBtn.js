import React from "react";
import "./NewGameBtn.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const NewGameBtn = props => (
        <div>
            <button className="newGame">
                Start new game
            </button>
            <button className="nextLevel">
                Go to next round
            </button>
        </div>
);


export default NewGameBtn;