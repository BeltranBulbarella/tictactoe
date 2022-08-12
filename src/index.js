import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button className="square" onClick={()=>props.onClick()}>
            {props.value}
        </button>
    );

}

function Board (props){

    const renderSquare=(i)=> {
        return (
            <Square
                value={props.squares[i]}
                onClick={()=>props.onClick(i)}
            />
        );
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

function Game(props) {
    const [history, setHistory] = useState([{squares: Array(9).fill(null)},]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);


    const handleClick=(i)=>{
        const historyAux = history.slice(0,stepNumber+1);
        const current = historyAux[historyAux.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history.concat([{
            squares: squares
        }]));
        setXIsNext(!xIsNext);
        setStepNumber(history.length);
    }

    const jumpTo=(step)=>{
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const current=history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}/>
            </div>
            <div className="game-info">
                <div>{ status }</div>
                <ul>{moves}</ul>
            </div>
        </div>
    );

}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default  Game;


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
