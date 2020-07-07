import React from "react";


type StoneType = {
    // TODO 各石と合法手の位置に関する型エイリアス
}

const defaultStone = {
    // TODO 各石と合法手の位置の初期値
}

export const StoneContext = React.createContext<StoneType>(defaultStone)

export const useStone = (): StoneType => {
    // TODO 各石と合法手の位置を扱うカスタムフックの定義
    return {

    }
}

type TurnType = {
    // TODO ターン数と手番に関する型エイリアス
}

const defaultTurn = {
    // TODO ターン数と手番の初期値
}

export const TurnContext = React.createContext<TurnType>(defaultTurn)

export const useTurn = (): TurnType => {
    // TODO ターン数と手番を扱うカスタムフックの定義
    return {

    }
}