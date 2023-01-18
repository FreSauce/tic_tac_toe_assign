function camelToTitleCase(str) {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const CustomInput = ({ name, type, placeholder, form, setForm }) => {
  return (
    <>
      <label
        className="subHeading"
        style={{
          fontSize: "14px",
          lineHeight: "16px",
          fontWeight: 800,
        }}
      >
        {camelToTitleCase(name)}
      </label>
      <input
        style={{
          width: "100%",
          height: "56px",
          borderRadius: "8px",
          background: "#F4F4F4",
          border: "none",
          padding: "0 16px",
          marginBottom: "10px",
          marginTop: "4px",
        }}
        name={name}
        type={type}
        id={name}
        required
        placeholder={placeholder}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
      />
    </>
  );
};

export default CustomInput;
