import React, {useContext} from "react";
import {OthelloContext} from "../Contexts/OthelloContext";

// TODO コメントを書く

export const ChangePlayerFirstTurnButton: React.FC = () => {
    const cxt = useContext(OthelloContext)

    return (
        <div>
            <button className="change-player-first-turn-button" onClick={cxt.changePlayerFirstTurn}>色の交代</button>
        </div>
    )
}