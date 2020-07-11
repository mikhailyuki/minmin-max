import {createContext, useCallback, useState} from "react";
import {getLegalHand, isEnd, isPass, reverseStone} from "./OthelloLogic";

// TODO コメントを書く
type OthelloContextType = {
    blackStone: bigint
    whiteStone: bigint
    legalHand: bigint
    playerFirstTurn: boolean
    gameStarted: boolean
    nowTurn: boolean
    nowTurnNum: number
    passFlag: boolean
    winner: number
    changePlayerFirstTurn: () => void
    gameStartOrReset: () => void
    putStone: (put: bigint) => void
    passTurn: () => void
}

const defaultOthelloContext = {
    blackStone: BigInt("0x0000000810000000"),
    whiteStone: BigInt("0x0000001008000000"),
    legalHand: BigInt(0),
    playerFirstTurn: true,
    gameStarted: false,
    nowTurn: true,
    nowTurnNum: 1,
    passFlag: false,
    winner: 0,
    changePlayerFirstTurn: () => {},
    gameStartOrReset: () => {},
    putStone: () => {},
    passTurn: () => {}
}

export const OthelloContext = createContext<OthelloContextType>(defaultOthelloContext)

export const useOthello = (): OthelloContextType => {
    const [blackStone, setBlackStone] = useState(BigInt("0x0000000810000000"))
    const [whiteStone, setWhiteStone] = useState(BigInt("0x0000001008000000"))
    const [legalHand, setLegalHand] = useState(BigInt(0))
    const [playerFirstTurn, setPlayerFirstTurn] = useState(true)
    const [gameStarted, setGameStarted] = useState(false)
    const [nowTurn, setNowTurn] = useState(true)
    const [nowTurnNum, setNowTurnNum] = useState(1)
    const [passFlag, setPassFlag] = useState(false)
    const [winner, setWinner] = useState(0)

    const changePlayerFirstTurn = useCallback((): void => {
        if (gameStarted) return
        setPlayerFirstTurn(!playerFirstTurn)
        setNowTurn(!nowTurn)
    }, [playerFirstTurn, gameStarted, nowTurn])

    const gameStartOrReset = useCallback((): void => {
        if (gameStarted) {
            setBlackStone(BigInt("0x0000000810000000"))
            setWhiteStone(BigInt("0x0000001008000000"))
            setLegalHand(BigInt(0))
            setGameStarted(false)
            setNowTurn(playerFirstTurn)
            setNowTurnNum(1)
            setWinner(0)
        } else {
            setGameStarted(true)
            setLegalHand(getLegalHand(blackStone, whiteStone, playerFirstTurn))

        }
    }, [blackStone, whiteStone, playerFirstTurn, gameStarted])

    const putStone = useCallback((put: bigint): void => {
        if (!gameStarted || passFlag) return
        const {reversedBlackStone, reversedWhiteStone, result} = reverseStone(put, blackStone, whiteStone, legalHand, nowTurn)
        if (result) {
            setBlackStone(reversedBlackStone)
            setWhiteStone(reversedWhiteStone)
            setLegalHand(getLegalHand(reversedBlackStone, reversedWhiteStone, !nowTurn))
            const judge = isEnd(reversedBlackStone, reversedWhiteStone)
            setWinner(judge)
            if (judge === 0) {
                setNowTurn(!nowTurn)
                setNowTurnNum(nowTurnNum + 1)
                setPassFlag(isPass(reversedBlackStone, reversedWhiteStone, !nowTurn))
            } else {
                setPassFlag(false)
            }
        }
    }, [blackStone, whiteStone, legalHand, gameStarted, nowTurn, nowTurnNum, passFlag])

    const passTurn = useCallback((): void => {
        if (!passFlag) return
        setLegalHand(getLegalHand(blackStone, whiteStone, !nowTurn))
        setNowTurn(!nowTurn)
        setNowTurnNum(nowTurnNum + 1)
    }, [blackStone, whiteStone, nowTurn, nowTurnNum, passFlag])

    return {
        blackStone,
        whiteStone,
        legalHand,
        playerFirstTurn,
        gameStarted,
        nowTurn,
        nowTurnNum,
        passFlag,
        winner,
        changePlayerFirstTurn,
        gameStartOrReset,
        putStone,
        passTurn
    }
}
