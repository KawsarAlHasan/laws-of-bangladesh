import React from "react";
import "./Loading.css";

const Loading = (props) => {
  return (
    <div className="loader-star">
      <div className="loader-body">
        <div className="loader"></div>
        <span className="loading-span">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
