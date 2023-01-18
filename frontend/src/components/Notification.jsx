import { useEffect } from "react";
import { useState } from "react";

const Notification = ({ content, ...props }) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(null);
  const [contentState, setContentState] = useState(content.text);

  useEffect(() => {
    if (content) {
      setContentState(content.text);
      setShow(true);
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          setShow(false);
          setContentState("");
        }, 2000)
      );
    }
  }, [content]);

  if (!show || contentState === "") return null;
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        background: "transparent",
        padding: "1rem",
        paddingBottom: "100px",
        alignItems: "end",
        zIndex: -100,
      }}
      {...props}
    >
      <div
        style={{
          width: "100%",
          height: "64px",
          display: "flex",
          color: "white",
          backgroundColor: content.backgroundColor || "#6FCF97",
          alignItems: "center",
          padding: "0 1rem",
          borderRadius: "8px",
          fontWeight: 600,
          boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.16)",
          zIndex: 1000,
        }}
        {...props}
      >
        {contentState}
      </div>
    </div>
  );
};

export default Notification;
