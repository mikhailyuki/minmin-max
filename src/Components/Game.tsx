import React from "react";
import '../index.css';
import {GameInfo} from "./GameInfo";
import {Board} from "./Board";

export const Game: React.FC = () => {
    return (
        <div className="game">
            <GameInfo />
            <Board />
        </div>
    );
}