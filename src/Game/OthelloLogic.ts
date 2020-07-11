
// ビット演算用の定数
const ZERO: bigint = BigInt("0")
const ONE: bigint = BigInt("1")
const TWO: bigint = BigInt("2")
const FOUR: bigint = BigInt("4")
const SEVEN: bigint = BigInt("7")
const EIGHT: bigint = BigInt("8")
const NINE: bigint = BigInt("9")
// 左右の辺を除いたマス
const HOR_EDGE: bigint = BigInt("0x7e7e7e7e7e7e7e7e")
// 上下の辺を除いたマス
const VER_EDGE: bigint = BigInt("0x00ffffffffffff00")
// 四辺を除いたマス
const ALL_EDGE: bigint = BigInt("0x007e7e7e7e7e7e00")
// 盤面の全てのマス
const BOARD: bigint = BigInt("0xffffffffffffffff")

// TODO コメントを書く

/**
 * 与えられた盤面における合法手の位置を返す関数。
 * @param blackStone
 * @param whiteStone
 * @param nowTurn
 */
export function getLegalHand(blackStone: bigint, whiteStone: bigint, nowTurn: boolean): bigint {
    // 自分の石
    const myStone: bigint = nowTurn ? blackStone : whiteStone
    // 相手の石
    const yourStone: bigint = nowTurn ? whiteStone : blackStone
    // 空きマス
    const blankBoard: bigint = BOARD ^ (myStone | yourStone)
    // 左右の辺の番兵
    const HOR_SENTINEL: bigint = yourStone & HOR_EDGE
    // 上下の辺の番兵
    const VER_SENTINEL: bigint = yourStone & VER_EDGE
    // 四辺の番兵
    const ALL_SENTINEL: bigint = yourStone & ALL_EDGE
    // 隣接マスに相手の石があるかどうかを調べるための一時変数
    let tmp: bigint
    // 合法手
    let legalHand: bigint

    // 8方向を順に探索
    // 左
    tmp = HOR_SENTINEL & (myStone << ONE)
    tmp |= HOR_SENTINEL & (tmp << ONE)
    tmp |= HOR_SENTINEL & (tmp << ONE)
    tmp |= HOR_SENTINEL & (tmp << ONE)
    tmp |= HOR_SENTINEL & (tmp << ONE)
    tmp |= HOR_SENTINEL & (tmp << ONE)
    legalHand = blankBoard & (tmp << ONE)

    // 右
    tmp = HOR_SENTINEL & (myStone >> ONE)
    tmp |= HOR_SENTINEL & (tmp >> ONE)
    tmp |= HOR_SENTINEL & (tmp >> ONE)
    tmp |= HOR_SENTINEL & (tmp >> ONE)
    tmp |= HOR_SENTINEL & (tmp >> ONE)
    tmp |= HOR_SENTINEL & (tmp >> ONE)
    legalHand |= blankBoard & (tmp >> ONE)

    // 上
    tmp = VER_SENTINEL & (myStone << EIGHT)
    tmp |= VER_SENTINEL & (tmp << EIGHT)
    tmp |= VER_SENTINEL & (tmp << EIGHT)
    tmp |= VER_SENTINEL & (tmp << EIGHT)
    tmp |= VER_SENTINEL & (tmp << EIGHT)
    tmp |= VER_SENTINEL & (tmp << EIGHT)
    legalHand |= blankBoard & (tmp << EIGHT)

    // 下
    tmp = VER_SENTINEL & (myStone >> EIGHT)
    tmp |= VER_SENTINEL & (tmp >> EIGHT)
    tmp |= VER_SENTINEL & (tmp >> EIGHT)
    tmp |= VER_SENTINEL & (tmp >> EIGHT)
    tmp |= VER_SENTINEL & (tmp >> EIGHT)
    tmp |= VER_SENTINEL & (tmp >> EIGHT)
    legalHand |= blankBoard & (tmp >> EIGHT)

    // 左上
    tmp = ALL_SENTINEL & (myStone << NINE)
    tmp |= ALL_SENTINEL & (tmp << NINE)
    tmp |= ALL_SENTINEL & (tmp << NINE)
    tmp |= ALL_SENTINEL & (tmp << NINE)
    tmp |= ALL_SENTINEL & (tmp << NINE)
    tmp |= ALL_SENTINEL & (tmp << NINE)
    legalHand |= blankBoard & (tmp << NINE)

    // 右上
    tmp = ALL_SENTINEL & (myStone << SEVEN)
    tmp |= ALL_SENTINEL & (tmp << SEVEN)
    tmp |= ALL_SENTINEL & (tmp << SEVEN)
    tmp |= ALL_SENTINEL & (tmp << SEVEN)
    tmp |= ALL_SENTINEL & (tmp << SEVEN)
    tmp |= ALL_SENTINEL & (tmp << SEVEN)
    legalHand |= blankBoard & (tmp << SEVEN)

    // 左下
    tmp = ALL_SENTINEL & (myStone >> SEVEN)
    tmp |= ALL_SENTINEL & (tmp >> SEVEN)
    tmp |= ALL_SENTINEL & (tmp >> SEVEN)
    tmp |= ALL_SENTINEL & (tmp >> SEVEN)
    tmp |= ALL_SENTINEL & (tmp >> SEVEN)
    tmp |= ALL_SENTINEL & (tmp >> SEVEN)
    legalHand |= blankBoard & (tmp >> SEVEN)

    // 右下
    tmp = ALL_SENTINEL & (myStone >> NINE)
    tmp |= ALL_SENTINEL & (tmp >> NINE)
    tmp |= ALL_SENTINEL & (tmp >> NINE)
    tmp |= ALL_SENTINEL & (tmp >> NINE)
    tmp |= ALL_SENTINEL & (tmp >> NINE)
    tmp |= ALL_SENTINEL & (tmp >> NINE)
    legalHand |= blankBoard & (tmp >> NINE)

    return legalHand
}

type reverseResult = {
    reversedBlackStone: bigint
    reversedWhiteStone: bigint
    result: boolean
}

/**
 * 指定された位置に石を置き、石の反転処理を行った盤面を返す関数。
 * @param put
 * @param blackStone
 * @param whiteStone
 * @param legalHand
 * @param nowTurn
 */
export function reverseStone(put: bigint,
                         blackStone: bigint,
                         whiteStone: bigint,
                         legalHand: bigint,
                         nowTurn: boolean): reverseResult {
    let reversedBlackStone: bigint = blackStone
    let reversedWhiteStone: bigint = whiteStone
    let result: boolean = false
    if (!canPut(put, legalHand)) {
        return {
            reversedBlackStone,
            reversedWhiteStone,
            result
        }
    }

    // 自分の石
    let myStone: bigint = nowTurn ? blackStone : whiteStone
    // 相手の石
    let yourStone: bigint = nowTurn ? whiteStone : blackStone
    // 反転する石の位置
    let rev: bigint = BigInt("0")

    for (let k = 0; k < 8; k++) {
        let mask = transfer(put, k)
        let tmpRev = BigInt("0")
        while ((mask & yourStone) !== ZERO) {
            tmpRev |= mask
            mask = transfer(mask, k)
        }
        if ((mask & myStone) !== ZERO) {
            rev |= tmpRev
        }
    }

    // 石を反転
    myStone ^= put | rev
    yourStone ^= rev

    // 結果
    reversedBlackStone = nowTurn ? myStone : yourStone
    reversedWhiteStone = nowTurn ? yourStone : myStone
    result = true

    return {
        reversedBlackStone,
        reversedWhiteStone,
        result
    }
}

/**
 * reverseで反転する石を探索するための関数。
 * @param put
 * @param k
 */
function transfer(put: bigint, k: number): bigint {
    if (k === 0) {
        return (put << EIGHT) & VER_EDGE
    } else if (k === 1) {
        return (put << SEVEN) & ALL_EDGE
    } else if (k === 2) {
        return (put >> ONE) & HOR_EDGE
    } else if (k === 3) {
        return (put >> NINE) & ALL_EDGE
    } else if (k === 4) {
        return (put >> EIGHT) & VER_EDGE
    } else if (k === 5) {
        return (put >> SEVEN) & ALL_EDGE
    } else if (k === 6) {
        return (put << ONE) & HOR_EDGE
    } else if (k === 7) {
        return (put << NINE) & ALL_EDGE
    } else {
        return ZERO
    }
}

/**
 * 指定された位置に石を置けるかどうか判定する関数。
 * @param put
 * @param legalHand
 */
export function canPut(put: bigint, legalHand: bigint): boolean {
    return (put & legalHand) === put
}

/**
 * 終局判定と勝者判定を行う関数。
 * @param blackStone
 * @param whiteStone
 */
export function isEnd(blackStone: bigint, whiteStone: bigint): number {
    const passFlag1: boolean = getLegalHand(blackStone, whiteStone, true) === ZERO
    const passFlag2: boolean = getLegalHand(blackStone, whiteStone, false) === ZERO

    if (passFlag1 && passFlag2) {
        const blackStoneCount: number = popCount(blackStone)
        const whiteStoneCount: number = popCount(whiteStone)
        if (blackStoneCount > whiteStoneCount) {
            return 1
        } else if (blackStoneCount < whiteStoneCount) {
            return 2
        } else{
            return 3
        }
    } else {
        return 0
    }

}

export function isPass(blackStone: bigint, whiteStone: bigint, nowTurn: boolean): boolean {
    return getLegalHand(blackStone, whiteStone, nowTurn) === ZERO
}

/**
 * 与えられた数値の2進表現において立っているビットの数を返す関数。
 * @param bitNum
 */
export function popCount(bitNum: bigint): number {
    // 2bitごとの組に分け、立っているビットの数を2bitで表現する
    let tmp = bitNum - ((bitNum >> ONE) & BigInt("0x5555555555555555"))
    // 4bit整数に上位2bit+下位2bitを計算した値を入れる
    tmp = (tmp & BigInt("0x3333333333333333")) + ((tmp >> TWO) & BigInt("0x3333333333333333"))
    tmp = (tmp + (tmp >> FOUR)) & BigInt("0xf0f0f0f0f0f0f0f")
    tmp += (tmp >> EIGHT)
    tmp += (tmp >> BigInt(16))
    tmp += (tmp >> BigInt(32))

    return Number(tmp & BigInt(0x7f))
}