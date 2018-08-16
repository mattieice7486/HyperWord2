import React from "react";
import "./NewGameBtn.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const NewGameBtn = props => (
        <div>
            <button onClick={props.func} className="newGame">
            Button
            </button>
        </div>
);


export default NewGameBtn;