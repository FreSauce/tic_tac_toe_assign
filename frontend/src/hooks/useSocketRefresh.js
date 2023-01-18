import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
const socket = io(process.env.REACT_APP_API_URL);

const useSocketRefresh = (callbackFn, gameId, userId) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join-room", gameId, userId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("user-connected", (userId) => {
      console.log("user-connected " + userId);
    });

    socket.on("user-disconnected", (userId) => {
      console.log("user-disconnected " + userId);
    });

    socket.onAny(() => {
      console.log("gameUpdate");
      callbackFn();
    });

    // socket.on("game-update", () => {
    //   console.log("gameUpdate");
    //   callbackFn();
    // });

    // return () => {
    //   socket.off("connect");
    //   socket.off("disconnect");
    //   socket.off("gameUpdate");
    //   socket.off("user-connected");
    // };
  }, [gameId, userId]);

  return isConnected;
};

export default useSocketRefresh;
