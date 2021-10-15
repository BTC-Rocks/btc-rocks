import React from "react";
const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    height: 20,
    width: "80%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#0e0de0",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span
          style={labelStyles}
          role="progressbar"
          aria-valuenow={`${completed}`}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {`${completed} BTC Rocks`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
