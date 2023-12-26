import React from "react";
import { SpinningCircles } from "react-loading-icons";
import "./loading_page.css";

function LoadingPage() {
  return (
    <div className="wrapper">
      <div className="message">
        Detecting Location for calculating real-time weather stats.
      </div>
      <div className="logo">
        <SpinningCircles stroke="#98ff98" strokeOpacity={0.125} speed={0.75} size={70} />
      </div>
    </div>
  );
}

export default LoadingPage;
