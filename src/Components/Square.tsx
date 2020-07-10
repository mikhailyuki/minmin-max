import React, {useContext, useMemo} from "react";
import '../index.css';
import {OthelloContext} from "../Contexts/OthelloContext";

// TODO コメントを書く

type SquareType = {
    index: number
}

export const Square: React.FC<SquareType> = (props) => {
    const cxt = useContext(OthelloContext)

    const stone = useMemo((): string => {
        const bigIndex = BigInt(props.index)
        const mask = BigInt("0x8000000000000000")
        const zero = BigInt(0)
        const blackFlag = ((mask >> bigIndex) & cxt.blackStone) !== zero
        const whiteFlag = ((mask >> bigIndex) & cxt.whiteStone) !== zero
        return blackFlag ? "●" : whiteFlag ? "○" : ""
    },[props.index, cxt.blackStone, cxt.whiteStone])

    const cssSetting = useMemo((): string => {
        const bigIndex = BigInt(props.index)
        const mask = BigInt("0x8000000000000000")
        const zero = BigInt(0)
        const legalFlag = ((mask >> bigIndex) & cxt.legalHand) !== zero
        return legalFlag ? "square-legal" : "square"
    }, [props.index, cxt.legalHand])

    const handleClick = (): void => {
        const bigIndex = BigInt(props.index)
        const mask = BigInt("0x8000000000000000")
        cxt.putStone(mask >> bigIndex)
    }

    return (
        <button className={cssSetting} onClick={handleClick}>
            {stone}
        </button>
    );
}