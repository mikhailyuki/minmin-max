import React from "react";
import '../index.css';
import {PlayerInfo} from "./PlayerInfo";
import {GameStartOrResetButton} from "./GameStartOrResetButton";
import {ChangePlayerFirstTurnButton} from "./ChangePlayerFirstTurnButton";
import {GameAnnounceText} from "./GameAnnounceText";
import {PassButton} from "./PassButton";

export const GameInfo: React.FC = () => {
    return (
        <div className="game-info">
            <PlayerInfo />
            <ChangePlayerFirstTurnButton />
            <GameStartOrResetButton />
            <PassButton />
            <GameAnnounceText />
        </div>
    );
}
