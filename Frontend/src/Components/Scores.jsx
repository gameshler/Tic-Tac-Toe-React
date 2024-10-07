import { useContext } from "react";
import { GameContext } from "../utils/Context/GameContext";

const Scores = () => {
  const { playerScore, playerTwoScore, tieScore } = useContext(GameContext);
  const ScoreItem = ({ label, value }) => (
    <div
      className={`cell flex flex-col items-center text-xl font-semibold rounded-lg ${
        label === "Player"
          ? "bg-blue-500 text-white"
          : label === "Tie"
          ? "bg-yellow-500 text-black"
          : "bg-green-500 text-white"
      }`}
    >
      <p className="mb-2">{label}</p>
      <p>{value}</p>
    </div>
  );
  return (
    <div className="game-board flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Scores</h1>
      <div className="board grid grid-cols-3 gap-3 w-3/12">
        <ScoreItem label="Player" value={playerScore} />
        <ScoreItem label="Tie" value={tieScore} />
        <ScoreItem label="Player 2" value={playerTwoScore} />
      </div>
    </div>
  );
};

export default Scores;
