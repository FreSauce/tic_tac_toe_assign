const TitleText = ({ children }) => {
  return (
    <h1
      style={{
        fontSize: "80px",
        lineHeight: "80px",
        fontWeight: 400,
        fontFamily: "Bilbo, cursive",
        textAlign: "center",
      }}
    >
      {children}
    </h1>
  );
};

export default TitleText;
