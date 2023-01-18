const Container = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        padding: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
