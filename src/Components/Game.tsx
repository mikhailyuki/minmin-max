import React from "react";
import '../index.css';
import {GameInfo} from "./GameInfo";
import {Board} from "./Board";
import {OthelloContext, useOthello} from "../Contexts/OthelloContext";

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