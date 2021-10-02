import React from "react";
import "./BoardItem.css";
const BoardItem = ({ row = null, column = null, boardClick, colors = {} }) => {
    return (
        <div className="BoardItem">
            <div
                className="BoardItem-bubble"
                onClick={() => boardClick(row, column)}
                style={{ background: colors[`${row}${column}`] }}
            />
        </div>
    );
};
export default BoardItem;
