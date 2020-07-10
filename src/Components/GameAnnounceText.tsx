import React, {useContext, useMemo} from "react";
import {OthelloContext} from "../Contexts/OthelloContext";

// TODO コメントを書く

export const GameAnnounceText: React.FC = () => {
    const cxt = useContext(OthelloContext)
    const text = useMemo((): string => {
        if (!cxt.gameStarted) return ""
        if (cxt.winner === 0) {
            return cxt.nowTurn ? "黒の番です" : "白の番です"
        } else if (cxt.winner === 1) {
            return "黒の勝ちです"
        } else if (cxt.winner === 2) {
            return "白の負けです"
        } else {
            return "引き分けです"
        }
    }, [cxt.gameStarted, cxt.winner, cxt.nowTurn])

    return (
        <p>{text}</p>
    )
}