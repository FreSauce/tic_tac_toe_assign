import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import TitleText from "../components/TitleText";

const Home = () => {
  return (
    <Container>
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            flexGrow: 2,
          }}
        >
          <TitleText>
            <span
              style={{
                fontSize: "36px",
              }}
            >
              async
            </span>{" "}
            <br />
            tic tac <br /> toe
          </TitleText>
        </div>
      </Content>
      <Link to={"/login"}>
        <Button backgroundColor="#F2C94C" color="white">
          Login
        </Button>
      </Link>
      <Link to={"/register"}>
        <Button backgroundColor="#2F80ED" color="white">
          Register
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
