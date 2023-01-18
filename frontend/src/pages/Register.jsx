import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Notification from "../components/Notification";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [notification, setNotification] = useState({
    text: "",
    backgroundColor: "transparent",
  });
  const navigate = useNavigate();
  const { signup } = useContext(UserContext);
  const formRef = useRef(null);
  const [userForm, setUserForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userForm);
    signup(
      userForm.name,
      userForm.username,
      userForm.email,
      userForm.password
    ).then((res) => {
      console.log(res);
      if (res) {
        setNotification({
          text: "Congratulations! Account created successfully.",
          backgroundColor: "#6FCF97",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setNotification({
          text: "Failed to create account. Username or email already exists.",
          backgroundColor: "#EB5757",
        });
      }
    });
  };

  return (
    <Container>
      <Header
        title={{
          text: "Let's Get To Know You Better",
          className: "heading",
        }}
        subTitle={{
          text: "Create Account",
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
        Register
      </Button>
    </Container>
  );
};

export default Register;
