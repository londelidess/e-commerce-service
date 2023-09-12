import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const PacmanLoading = ({ size = 100, color = "gold" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <PacmanLoader color={color} size={size} css={override} />
    </div>
  );
};

export default PacmanLoading;
