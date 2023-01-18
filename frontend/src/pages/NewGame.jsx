import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";

const NewGame = () => {
  const navigate = useNavigate();
  const { user, createGame } = useContext(UserContext);
  const formRef = useRef(null);
  const [userForm, setUserForm] = useState({
    email: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userForm);
    createGame(userForm.email).then((res) => {
      if (res) {
        console.log(res);
        navigate("/");
      }
    });
  };
  return (
    <Container>
      <Header
        title={{
          text: "Whom do you want to play with",
          className: "heading",
        }}
        subTitle={{
          text: "Start a new game",
          className: "subHeading",
        }}
      />
      <Content>
        <form ref={formRef} onSubmit={submitHandler}>
          {Object.keys(userForm).map((el) => {
            return (
              <CustomInput
                key={el}
                name={el}
                type={"text"}
                placeholder={`Type your ${el} here`}
                form={userForm}
                setForm={setUserForm}
              />
            );
          })}
        </form>
      </Content>
      <Button
        backgroundColor="#F2C94C"
        color="white"
        onClick={() => {
          if (userForm.email !== user.email) {
            console.log(formRef.current);
            formRef.current.requestSubmit();
          }
        }}
      >
        Start Game
      </Button>
    </Container>
  );
};

export default NewGame;
