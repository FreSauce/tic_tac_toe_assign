import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ subTitle, title, backAction }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
      }}
    >
      <FaChevronLeft size={"24px"} onClick={() => navigate(-1)} />
      <div
        style={{
          paddingTop: "3.5rem",
          paddingBotton: "2rem",
        }}
      >
        <h2 className={subTitle.className}>{subTitle.text}</h2>
        <h1 className={title.className}>{title.text}</h1>
      </div>
    </div>
  );
};

export default Header;
