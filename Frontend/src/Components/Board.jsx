import { useContext } from "react";
import { GameContext } from "../utils/Context/GameContext";

const Board = () => {
  const {
    handleClick,
    calculateWinner,
    restartBoard,
    resetBoard,
    board,
    isCircleTurn,
  } = useContext(GameContext);

  const status = calculateWinner(board)
    ? `Winner: ${calculateWinner(board)}`
    : board.every((cell) => cell !== null)
    ? "It's a draw!"
    : `Next player: ${isCircleTurn ? "O" : "X"}`;

  return (
    <div className="game-board flex flex-col items-center justify-center h-3/4 mt-28 p-4">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      {status && <p className="text-xl font-semibold mb-4">{status}</p>}
      <div className="board grid grid-cols-3 gap-3 w-1/5">
        {board.map((square, index) => (
          <div
            key={index}
            className={`cell flex items-center h-12 justify-center text-2xl font-bold rounded-lg cursor-pointer ${
              square === "X"
                ? "bg-blue-500 text-white"
                : square === "O"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleClick(index)}
          >
            {square}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          onClick={restartBoard}
        >
          Restart
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          onClick={resetBoard}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Board;
