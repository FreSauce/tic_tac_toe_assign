import { useContext } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Notification from "../components/Notification";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [notification, setNotification] = useState({
    text: "",
    backgroundColor: "transparent",
  });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userForm);
    login(userForm.username, userForm.password).then((res) => {
      console.log(res);
      if (res) {
        setNotification({
          text: "Congratulations!!! Account created.",
          backgroundColor: "#6FCF97",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setNotification({
          text: "Enter correct details.",
          backgroundColor: "#EB5757",
        });
      }
    });
  };

  return (
    <Container>
      <Header
        title={{
          text: "Please enter your details",
          className: "heading",
        }}
        subTitle={{
          text: "Login",
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
                type={
                  el === "password"
                    ? "password"
                    : el === "email"
                    ? "email"
                    : "text"
                }
                placeholder={`Type your ${el} here`}
                form={userForm}
                setForm={setUserForm}
              />
            );
          })}
        </form>
      </Content>
      <Notification content={notification} />
      <Button
        backgroundColor="#F2C94C"
        color="white"
        onClick={() => {
          console.log(formRef.current);
          formRef.current.requestSubmit();
        }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
