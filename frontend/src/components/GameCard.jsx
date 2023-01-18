import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import GameButton from "./GameButton";

function gameCondition(opponent, isPlayer1, status) {
  if (status === "p1won" && isPlayer1) return "You won!";
  if (status === "p2won" && !isPlayer1) return "You won!";
  if (status === "p1won" && !isPlayer1) return `You lost!`;
  if (status === "p2won" && isPlayer1) return `You lost!`;
  if (status === "draw") return "It's a Draw!";
  if (
    (status === "p1turn" && isPlayer1) ||
    (status === "p2turn" && !isPlayer1)
  ) {
    return (
      <>
        {opponent} just made their move!
        <br />
        It's your turn now!
      </>
    );
  } else {
    return (
      <>
        You've made your move!
        <br />
        Waiting for them.
      </>
    );
  }
}

const GameCard = ({ gameData }) => {
  const { user } = useContext(UserContext);
  const [opponent, setOpponent] = useState(null);
  const [isPlayer1, setIsPlayer1] = useState(false);

  const myTurn =
    (gameData.status === "p1turn" && isPlayer1) ||
    (gameData.status === "p2turn" && !isPlayer1);

  useEffect(() => {
    if (gameData.player1.username === user.username) {
      setOpponent(gameData.player2.username);
      setIsPlayer1(true);
    } else {
      setOpponent(gameData.player1.username);
      setIsPlayer1(false);
    }
  }, [gameData, user]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "16px",
        boxShadow: "2px 4px 16px rgba(0, 0, 0, 0.25)",
        margin: "8px 0",
        borderRadius: "8px",
        border: "none",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          padding: "4px 0",
        }}
      >
        Game with {opponent}
      </h1>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 400,
          color: "black",
          padding: "2px",
          margin: "10px 0",
          lineHeight: "16px",
        }}
      >
        {gameCondition(opponent, isPlayer1, gameData.status)}
      </p>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 400,
          color: "#828282",
          padding: "4px",
          margin: "5px 0",
        }}
      >
        {new Date(gameData.updatedAt).toLocaleString()}
      </p>
      <GameButton backgroundColor={"#F2C94C"} color="white">
        <Link to={`/${gameData.gameId}`}>
          <span style={{ fontSize: "14px", fontWeight: 700 }}>
            {myTurn ? "Play!" : "View Game"}
          </span>
        </Link>
      </GameButton>
    </div>
  );
};

export default GameCard;
