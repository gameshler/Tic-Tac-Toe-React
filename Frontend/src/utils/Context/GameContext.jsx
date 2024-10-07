import { useEffect } from "react";
import { createContext, useState } from "react";

export const GameContext = createContext();
const GameProvider = ({ children }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isCircleTurn, setIsCircleTurn] = useState(false);
  const [gameScores, setGameScores] = useState({
    player: 0,
    player2: 0,
    tie: 0,
  });
  const updateScores = (result) => {
    if (result === "player") {
      setPlayerScore(playerScore + 1);
    } else if (result === "player 2") {
      setPlayerTwoScore(playerTwoScore + 1);
    } else {
      setTieScore(tieScore + 1);
    }
  };

  const addResult = (result) => {
    setGameResults([...gameResults, result]);
  };

  const resetScores = () => {
    setPlayerScore(0);
    setPlayerTwoScore(0);
    setTieScore(0);
    setGameResults([]);
  };
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isCircleTurn ? "O" : "X";
    setBoard(newBoard);

    if (calculateWinner(newBoard)) {
      const winner = isCircleTurn ? "player 2" : "player";
      updateScores(winner);
      addResult({ winner });

      setGameScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    } else if (newBoard.every((square) => square)) {
      updateScores("tie");
      addResult({ winner: "tie" });
      setGameScores((prevScores) => ({
        ...prevScores,
        tie: prevScores.tie + 1,
      }));
    }

    setIsCircleTurn(!isCircleTurn);
  };

  const calculateWinner = (squares) => {
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
  };

  const restartBoard = () => {
    setBoard(Array(9).fill(null));
    setIsCircleTurn(false);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsCircleTurn(false);
    resetScores();
  };

  useEffect(() => {
    if (calculateWinner(board)) {
      restartBoard();
    }
  }, [board]);

  const contextValue = {
    playerScore,
    playerTwoScore,
    tieScore,
    gameResults,
    updateScores,
    addResult,
    resetScores,
    handleClick,
    calculateWinner,
    restartBoard,
    resetBoard,
    board,
    isCircleTurn,
    gameScores,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export { GameProvider };
