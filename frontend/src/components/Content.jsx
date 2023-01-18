const Content = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        flexGrow: 2,
        paddingTop: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default Content;
