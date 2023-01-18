const Button = ({ backgroundColor, color, children, ...props }) => {
  return (
    <button
      style={{
        width: "100%",
        height: "40px",
        borderRadius: "8px",
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.16)",
        border: "none",
        backgroundColor: backgroundColor,
        color: color,
        marginTop: "10px",
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
