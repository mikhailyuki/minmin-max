import React from "react";
import '../index.css';

type SquareType = {
    index: number
}

export const Square: React.FC<SquareType> = (props) => {
    return (
        <button className="square">
            {props.index}
        </button>
    );
}