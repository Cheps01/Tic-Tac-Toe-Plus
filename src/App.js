import { useState } from "react";

function Square({ value, onSquareClick, isLastMove }) {
  return (
    <button
      style={{ backgroundColor: isLastMove ? "yellow" : "white" }}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, lastMove }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner" + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          isLastMove={0 === lastMove}
          value={squares[0]}
          onSquareClick={(onSquareClick = () => handleClick(0))}
        />
        <Square
          isLastMove={1 === lastMove}
          value={squares[1]}
          onSquareClick={(onSquareClick = () => handleClick(1))}
        />
        <Square
          isLastMove={2 === lastMove}
          value={squares[2]}
          onSquareClick={(onSquareClick = () => handleClick(2))}
        />
      </div>
      <div className="board-row">
        <Square
          isLastMove={3 === lastMove}
          value={squares[3]}
          onSquareClick={(onSquareClick = () => handleClick(3))}
        />
        <Square
          isLastMove={4 === lastMove}
          value={squares[4]}
          onSquareClick={(onSquareClick = () => handleClick(4))}
        />
        <Square
          isLastMove={5 === lastMove}
          value={squares[5]}
          onSquareClick={(onSquareClick = () => handleClick(5))}
        />
      </div>
      <div className="board-row">
        <Square
          isLastMove={6 === lastMove}
          value={squares[6]}
          onSquareClick={(onSquareClick = () => handleClick(6))}
        />
        <Square
          isLastMove={7 === lastMove}
          value={squares[7]}
          onSquareClick={(onSquareClick = () => handleClick(7))}
        />
        <Square
          isLastMove={8 === lastMove}
          value={squares[8]}
          onSquareClick={(onSquareClick = () => handleClick(8))}
        />
      </div>
    </>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [lastMove, setLastMove] = useState();
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares, n) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setLastMove(n);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button class="btn btn-outline-dark" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });
  return (
    <div class="container">
      <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              lastMove={lastMove}
            />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}
