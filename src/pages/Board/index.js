import React from "react";
import BoardItem from "./components/BoardItem";
import Modal from "./components/Modal";
import "./Board.css";

const Board = () => {
    const [colors, setColors] = React.useState({});
    const [currentPlayer, setCurrentPlayer] = React.useState(null);
    const [show, setShow] = React.useState(false);
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [isPlayerWonTheGame, setIsPlayerWonTheGame] = React.useState(false);

    React.useEffect(() => {
        setShow(true);
    }, []);

    const isCurrentPlayerWon = (currentPlayer, row, column, colorCoding) => {
        let results = [];
        const color = currentPlayer === "player-2" ? "purple" : "yellow";

        // This block is to check if there is a match row wise from top to bottom
        for (let i = row; i < row + 4; i++) {
            if (colorCoding[`${i}${column}`]) {
                results.push(colorCoding[`${i}${column}`]);
            }
        }
        if (results.length === 4 && results.every((result) => result === color)) {
            return true;
        }

        // This block is to check if there is a match row wise from bottom to top. Extra check
        results = [];
        for (let i = row; i > row - 4; i--) {
            if (colorCoding[`${i}${column}`]) {
                results.push(colorCoding[`${i}${column}`]);
            }
        }
        if (results.length === 4 && results.every((result) => result === color)) {
            return true;
        }

        // This block is to check if there is a match column wise from right to left.
        results = [];
        for (let i = column; i > column - 4; i--) {
            if (colorCoding[`${row}${i}`]) {
                results.push(colorCoding[`${row}${i}`]);
            }
        }
        if (results.length === 4 && results.every((result) => result === color)) {
            return true;
        }

        // This block is to check if there is a match column wise from left to right.
        results = [];
        for (let i = column; i < column + 4; i++) {
            if (colorCoding[`${row}${i}`]) {
                results.push(colorCoding[`${row}${i}`]);
            }
        }
        if (results.length === 4 && results.every((result) => result === color)) {
            return true;
        }

        // This block is to check if there is a match diagonally from left to right.
        results = [];
        let j = column;
        for (let i = row; i < row + 4; i++) {
            if (colorCoding[`${i}${j}`]) {
                results.push(colorCoding[`${i}${j}`]);
            }
            j -= 1;
        }
        if (results.length === 4 && results.every((result) => result === color)) {
            return true;
        }

        // This block is to check if there is a match diagonally from right to left.
        results = [];
        j = column;
        for (let i = row; i < row + 4; i++) {
            if (colorCoding[`${i}${j}`]) {
                results.push(colorCoding[`${i}${j}`]);
            }
            j += 1;
        }
        if (results.length === 4 && results.every((result) => result === color)) {
            return true;
        }
    };
    const boardClick = (row, column) => {
        const colorCoding = { ...colors };
        let player = currentPlayer;
        if (!player) {
            player = "player-1";
        } else if (player === "player-1") {
            player = "player-2";
        } else {
            player = "player-1";
        }
        setCurrentPlayer(() => player);
        for (let i = height - 1; i >= row; i--) {
            if (!colorCoding[`${i}${column}`]) {
                colorCoding[`${i}${column}`] =
                    player === "player-2" ? "purple" : "yellow";
                break;
            }
        }
        setColors(() => colorCoding);
        if (isCurrentPlayerWon(player, row, column, colorCoding)) {
            setIsPlayerWonTheGame(true);
        }
    };

    const drawBoard = () => {
        if (width && height) {
            const board = new Array(height).fill().map((row, i) => {
                return (
                    <div className="Board-row">
                        {new Array(width).fill().map((column, j) => {
                            return (
                                <BoardItem
                                    row={i}
                                    column={j}
                                    boardClick={boardClick}
                                    colors={colors}
                                />
                            );
                        })}
                    </div>
                );
            });
            return board;
        }
        return null;
    };

    const changeWidth = (e) => {
        if (e.target.value && !isNaN(e.target.value) && e.target.value >= 4 ) {
            setWidth(() => parseInt(e.target.value, 10))
        } else {
            setWidth(() => null) ;
        }
    }

    const changeHeight = (e) => {
        if (e.target.value && !isNaN(e.target.value) && e.target.value >= 4) {
            setHeight(() => parseInt(e.target.value, 10))
        } else {
            setHeight(() => null)
        }
    }

    return (
        <div className="Board">
            {drawBoard()}
            <Modal
                title="Welcome to connect four game. Please choose the board"
                onClose={() => width && height && setShow(false)}
                show={show}
            >
                <div className="Board-input">
                    <div className="Board-weight">
                        <label htmlFor="width">Input width for the board: </label>
                        <input
                            type="text"
                            name="width"
                            id="width"
                            placeholder="should be at least 4"
                            value={width}
                            onChange={(e) => changeWidth(e)}
                        />
                    </div>
                    <div className="Board-height">
                        <label htmlFor="height">Input height for the board: </label>
                        <input
                            type="text"
                            name="height"
                            placeholder="should be at least 4"
                            id="height"
                            value={height}
                            onChange={(e) => changeHeight(e)}
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                title={`Hurray !!! ${currentPlayer} won the game. You want to start again ?`}
                onClose={() => setIsPlayerWonTheGame(false)}
                show={isPlayerWonTheGame}
            >
                <div className="Board-game-success">
                    <button
                        type="button"
                        className="Board-start-again"
                        onClick={() => window.location.reload()}
                    >
                        Start again
                    </button>
                </div>
            </Modal>
        </div>
    );
};
export default Board;
