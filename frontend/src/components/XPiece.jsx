const XPiece = ({ sz }) => {
  return (
    <div
      style={{
        width: sz,
        height: sz,
      }}
    >
      <svg viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="105.09" height="105.09" fill="white" />
        <rect
          width="16.1985"
          height="72.8932"
          rx="8.09924"
          transform="matrix(0.706472 0.707741 -0.706472 0.707741 72.5152 21.0184)"
          fill="#2C8DFF"
        />
        <rect
          width="16.1985"
          height="72.8932"
          rx="8.09924"
          transform="matrix(0.706472 -0.707741 0.706472 0.707741 21.1311 32.4824)"
          fill="#2C8DFF"
        />
      </svg>
    </div>
  );
};

export default XPiece;
