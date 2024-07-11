import * as React from "react";
import logo from "../assets/logo.svg";
import "./Logo.css";

const Logo: React.FC = () => {
  return (
    <div
      onClick={() => {
        window.open("https://gitcoin.co", "_blank");
      }}
    >
      <img src={logo} alt="Gitcoin" className="widget-logo" />
    </div>
  );
};

export default Logo;
