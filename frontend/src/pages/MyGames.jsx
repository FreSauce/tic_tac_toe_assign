import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import GameCard from "../components/GameCard";
import NewGameButton from "../components/NewGameButton";
import TitleText from "../components/TitleText";
import { UserContext } from "../context/UserContext";

const MyGames = () => {
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container>
      <h1
        style={{
          fontSize: "32px",
          padding: "20px 0",
          lineHeight: "2.4rem",
        }}
      >
        Your Games
      </h1>
      <Content>
        {user.games.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              flexGrow: 2,
            }}
          >
            <TitleText>
              No Games <br /> Found
            </TitleText>
            <Link to="/new-game">
              <Button backgroundColor="#F2C94C" color="white">
                Create New Game
              </Button>
            </Link>
          </div>
        ) : (
          <NewGameButton />
        )}
        {user.games.reverse().map((game) => (
          <GameCard gameData={game} key={game.gameId} />
        ))}
      </Content>
    </Container>
  );
};

export default MyGames;
