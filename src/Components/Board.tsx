import React from "react";
import '../index.css';
import {Square} from "./Square";

export const Board: React.FC = () => {
    return (
        <div>
            <Square index={0} />
        </div>
    );
}