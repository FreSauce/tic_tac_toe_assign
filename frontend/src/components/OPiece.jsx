const OPiece = ({ sz }) => {
  return (
    <div
      style={{
        width: sz,
        height: sz,
      }}
    >
      <svg viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="106" height="106" fill="white" />
        <circle
          cx="53"
          cy="53"
          r="23.625"
          stroke="#FF4F4F"
          strokeWidth="15.75"
        />
      </svg>
    </div>
  );
};

export default OPiece;
