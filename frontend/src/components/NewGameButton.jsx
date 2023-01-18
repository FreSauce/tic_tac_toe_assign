import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewGameButton = () => {
  return (
    <Link to="/new-game">
      <button
        style={{
          backgroundColor: "#270F36",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.16)",
          width: "124px",
          height: "40px",
          position: "absolute",
          bottom: "24px",
          right: "24px",
          fontWeight: "bold",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        <FaPlus size={"13px"} /> New Game
      </button>
    </Link>
  );
};

export default NewGameButton;
