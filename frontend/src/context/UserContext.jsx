/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocalState } from "../hooks/useLocalState";

const API_URL = process.env.REACT_APP_API_URL;

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalState("token", null);
  const [loading, setLoading] = useState(true);
  const api = axios.create();

  const signup = async (name, username, email, password) => {
    return api
      .post(API_URL + "/users/signup", {
        name,
        username,
        email,
        password,
      })
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const login = async (username, password) => {
    return api
      .post(API_URL + "/users/login", { username, password })
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.token);
          return true;
        }
      })
      .catch((err) => {
        setToken(null);
        console.log(err);
        return false;
      });
  };

  const logout = () => {
    setToken(null);
  };

  const fetchUser = async () => {
    return api
      .get(API_URL + "/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createGame = async (opponentMail) => {
    return api
      .post(
        API_URL + "/games/create",
        {
          opponent: opponentMail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        return true;
      })
      .catch((err) => {
        console.log(err.response.data);
        return false;
      });
  };

  const fetchGame = async (gameId) => {
    return api
      .get(API_URL + `/games/${gameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data.game;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const updateGame = async (gameId, gameBoard) => {
    return api
      .put(
        API_URL + `/games/${gameId}`,
        { board: gameBoard },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        return res.data.game;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  useEffect(() => {
    let id;
    if (token) {
      console.log("in useEffect");
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
    }
    return () => clearInterval(id);
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        signup,
        login,
        logout,
        fetchUser,
        createGame,
        fetchGame,
        updateGame,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
