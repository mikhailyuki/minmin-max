import React from "react";
import '../../index.css';
import {Square} from "./Square";

export const Board: React.FC = () => {
    return (
        <div>
            <div className="board-row">
                <Square index={0} />
                <Square index={1} />
                <Square index={2} />
                <Square index={3} />
                <Square index={4} />
                <Square index={5} />
                <Square index={6} />
                <Square index={7} />
            </div>
            <div className="board-row">
                <Square index={8} />
                <Square index={9} />
                <Square index={10} />
                <Square index={11} />
                <Square index={12} />
                <Square index={13} />
                <Square index={14} />
                <Square index={15} />
            </div>
            <div className="board-row">
                <Square index={16} />
                <Square index={17} />
                <Square index={18} />
                <Square index={19} />
                <Square index={20} />
                <Square index={21} />
                <Square index={22} />
                <Square index={23} />
            </div>
            <div className="board-row">
                <Square index={24} />
                <Square index={25} />
                <Square index={26} />
                <Square index={27} />
                <Square index={28} />
                <Square index={29} />
                <Square index={30} />
                <Square index={31} />
            </div>
            <div className="board-row">
                <Square index={32} />
                <Square index={33} />
                <Square index={34} />
                <Square index={35} />
                <Square index={36} />
                <Square index={37} />
                <Square index={38} />
                <Square index={39} />
            </div>
            <div className="board-row">
                <Square index={40} />
                <Square index={41} />
                <Square index={42} />
                <Square index={43} />
                <Square index={44} />
                <Square index={45} />
                <Square index={46} />
                <Square index={47} />
            </div>
            <div className="board-row">
                <Square index={48} />
                <Square index={49} />
                <Square index={50} />
                <Square index={51} />
                <Square index={52} />
                <Square index={53} />
                <Square index={54} />
                <Square index={55} />
            </div>
            <div className="board-row">
                <Square index={56} />
                <Square index={57} />
                <Square index={58} />
                <Square index={59} />
                <Square index={60} />
                <Square index={61} />
                <Square index={62} />
                <Square index={63} />
            </div>
        </div>
    );
}