import React, {useContext, useMemo} from "react";
import {OthelloContext} from "../Contexts/OthelloContext";

// TODO コメントを書く

export const GameStartOrResetButton: React.FC = () => {
    const cxt = useContext(OthelloContext)
    const text = useMemo((): string => {
        return cxt.gameStarted ? "リセット" : "対局開始"
    }, [cxt.gameStarted])

    return (
        <div>
            <button className="game-start-or-reset-button" onClick={cxt.gameStartOrReset}>{text}</button>
        </div>
    )
}