import React from "react";
import '../index.css';
import {GameInfo} from "../Game/GameInfo/GameInfo";
import {Board} from "../Game/Board/Board";
import {OthelloContext, useOthello} from "./OthelloContext";

export const Game: React.FC = () => {
    const cxt = useOthello()
    return (
        <OthelloContext.Provider value={cxt}>
            <div className="game">
                <GameInfo />
                <Board />
            </div>
        </OthelloContext.Provider>
    );
}