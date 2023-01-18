const Button = ({ backgroundColor, color, children, ...props }) => {
  return (
    <button
      style={{
        width: "100%",
        height: "56px",
        borderRadius: "8px",
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.16)",
        border: "none",
        backgroundColor: backgroundColor,
        color: color,
        margin: "10px 0",
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
