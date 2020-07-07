
export function getLegalHand(): number {
    // TODO 合法手の位置を返す関数の定義
    return 0
}

type reversedStone = {
    tmp: number
    foo: number
}

export function reversed(tmp: number, foo: number): reversedStone {
    // TODO 石の反転処理をした盤面を返す関数の定義
    return {
        tmp,
        foo
    }
}

export function canPut(put: number, legalHand: number): boolean {
    // TODO 指定された位置に石を置けるかどうかの判定を行う関数
    return true
}

export function isEnd(blackStone: number, whiteStone: number): number {
    // TODO 終局判定と勝者判定を行う関数
    return 0
}