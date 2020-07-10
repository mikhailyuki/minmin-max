import React, {useContext, useMemo} from "react";
import {OthelloContext} from "../Contexts/OthelloContext";
import {popCount} from "../Functions/OthelloLogic";

// TODO コメントを書く

export const PlayerInfo: React.FC = () => {
    const cxt = useContext(OthelloContext)
    const playerColor = useMemo((): string => {
        return cxt.playerFirstTurn ? "●" : "○"
    }, [cxt.playerFirstTurn])
    const cpuColor = useMemo((): string => {
        return cxt.playerFirstTurn ? "○" : "●"
    }, [cxt.playerFirstTurn])
    const playerStoneCount = useMemo((): number => {
        const playerStone = cxt.playerFirstTurn ? cxt.blackStone : cxt.whiteStone
        return popCount(playerStone)
    }, [cxt.playerFirstTurn, cxt.blackStone, cxt.whiteStone])
    const cpuStoneCount = useMemo((): number => {
        const cpuStone = cxt.playerFirstTurn ? cxt.whiteStone : cxt.blackStone
        return popCount(cpuStone)
    }, [cxt.playerFirstTurn, cxt.blackStone, cxt.whiteStone])

    return (
        <div>
            <p>{playerStoneCount} {playerColor}あなた vs CPU{cpuColor} {cpuStoneCount}</p>
        </div>
    )
}