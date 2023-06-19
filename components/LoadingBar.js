import React from "react";

const LoadingBar = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-full">
      <div className="w-full h-1 bg-[#417EF5]  animate-loading-bar"></div>
    </div>
  );
};

export default LoadingBar;

LoadingBar.defaultProps = {
  width: "100px",
};
