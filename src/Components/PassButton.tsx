import React, {useContext} from "react";
import {OthelloContext} from "../Contexts/OthelloContext";

// TODO コメントを書く

export const PassButton: React.FC = () => {
    const cxt = useContext(OthelloContext)

    return (
        <div>
            <button className="pass-button" onClick={cxt.passTurn}>パス</button>
        </div>
    )
}