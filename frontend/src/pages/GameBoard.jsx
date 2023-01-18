import { useContext, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import XPiece from "../components/XPiece";
import OPiece from "../components/OPiece";
import { useEffect } from "react";
import { UserContext } from "../context/UserContext";
import useSocketRefresh from "../hooks/useSocketRefresh";

function border(index) {
  let cname = "";
  if (index % 3 == 0) {
    cname += "l ";
  } else if (index % 3 == 2) {
    cname += "r ";
  }
  if (index > 5) {
    cname += "b ";
  }
  return cname;
}

function calculateStatus(gameState, isPlayer1) {
  if (gameState.status === "p1won" && isPlayer1) return 1;
  else if (gameState.status === "p2won" && !isPlayer1) return 1;
  else if (gameState.status === "p1won" && !isPlayer1) return 2;
  else if (gameState.status === "p2won" && isPlayer1) return 2;
  else if (gameState.status === "draw") return 0;
  else if (gameState.status === "p1turn" && isPlayer1) return 3;
  else if (gameState.status === "p2turn" && !isPlayer1) return 3;
  else return 4;
}

const loop = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const GameBoard = () => {
  const { id } = useParams();
  const { user, fetchGame, updateGame } = useContext(UserContext);
  const [gameState, setGameState] = useState(null);
  const [displayBoard, setDisplayBoard] = useState(new Array(9).fill(0));
  const [isPlayer1, setIsPlayer1] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [moves, setMoves] = useState(0);
  const updateBoard = async () => {
    return fetchGame(id).then((game) => setGameState(game));
  };
  const isConnected = useSocketRefresh(updateBoard, id, user.email);

  useEffect(() => {
    updateBoard();
  }, []);

  useEffect(() => {
    if (gameState && gameState.board !== displayBoard) {
      setDisplayBoard(gameState.board);
    }
  }, [gameState]);

  const handleClick = (index) => {
    if (isMyTurn && gameState.board[index] === 0) {
      const newBoard = [...gameState.board];
      newBoard[index] = isPlayer1 ? 1 : 2;
      setDisplayBoard([...newBoard]);
    }
  };

  useEffect(() => {
    if (gameState) setIsPlayer1(gameState.player1.username === user.username);
    if (gameState) {
      setIsMyTurn(
        (gameState.player1.username === user.username &&
          gameState.status === "p1turn") ||
          (gameState.player2.username === user.username &&
            gameState.status === "p2turn")
      );
    }
    if (gameState) {
      if (gameState.player1.username === user.username) {
        setOpponent(gameState.player2.username);
      } else {
        setOpponent(gameState.player1.username);
      }
    }
  }, [gameState]);

  const navigate = useNavigate();

  if (!gameState) {
    return null;
  }

  return (
    <Container>
      {console.log(displayBoard)}
      <Content>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          <FaChevronLeft size={"24px"} onClick={() => navigate("/")} />
          <div
            style={{
              paddingTop: "3.5rem",
              paddingBotton: "2rem",
            }}
          >
            <h1
              style={{
                padding: "4px",
                fontSize: "28px",
                letterSpacing: "-0.05rem",
                color: "#333333",
              }}
            >
              Game with {opponent} {isConnected ? "🟢" : "🔴"}
            </h1>
            <h3
              style={{
                padding: "4px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Your Piece
            </h3>
            <XPiece sz="64px" />
          </div>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>
                  {calculateStatus(gameState, isPlayer1) === 1
                    ? "You Win!"
                    : calculateStatus(gameState, isPlayer1) === 2
                    ? "You Lose!"
                    : calculateStatus(gameState, isPlayer1) === 0
                    ? "Draw!"
                    : calculateStatus(gameState, isPlayer1) === 3
                    ? "Your Move!"
                    : "Their Move!"}
                </th>
              </tr>
            </thead>
            <tbody>
              {loop.map((row, rIndex) => {
                return (
                  <tr key={rIndex}>
                    {row.map((col, cIndex) => {
                      return (
                        <td
                          className={border(col)}
                          key={col}
                          onClick={() => handleClick(col)}
                        >
                          {displayBoard[col] === 1 ? (
                            isPlayer1 ? (
                              <XPiece sz="100px" />
                            ) : (
                              <OPiece sz="100px" />
                            )
                          ) : displayBoard[col] === 2 ? (
                            isPlayer1 ? (
                              <OPiece sz="100px" />
                            ) : (
                              <XPiece sz="100px" />
                            )
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Content>
      {isMyTurn ? (
        <Button
          backgroundColor="#F2C94C"
          color="white"
          onClick={() => {
            updateGame(id, displayBoard).then(() => updateBoard());
          }}
        >
          Submit!
        </Button>
      ) : (
        <Button backgroundColor="#E0E0E0" color="white" disabled>
          Waiting for {opponent}
        </Button>
      )}
    </Container>
  );
};

export default GameBoard;
