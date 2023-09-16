import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

const commonStyles = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: '460px',
  minHeight: "360px",
  // width:'100%',
  // height:'100%',
};

const PacmanLoading = ({ size = 100, color = "gold" }) => {
  return (
    <div style={containerStyles}>
      <PacmanLoader color={color} size={size} css={commonStyles} />
    </div>
  );
};

const ScaleLoading = ({ size = 100, color = "gold" }) => {
  return (
    <div style={containerStyles}>
      <ScaleLoader color={color} size={size} css={commonStyles} />
    </div>
  );
};

export { PacmanLoading, ScaleLoading };
