import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";

const useSocketRefresh = (callbackFn, gameId, userId) => {
  const [socket, setSocket] = useState(io(process.env.REACT_APP_API_URL));
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join-room", gameId, userId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setSocket(io(process.env.REACT_APP_API_URL));
    });

    socket.onAny(() => {
      console.log("gameUpdate");
      callbackFn();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [gameId, userId]);

  return isConnected;
};

export default useSocketRefresh;
