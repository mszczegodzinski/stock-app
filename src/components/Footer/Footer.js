import React from "react";
import "../../utils/customStyles.css";

const footerStyle = {
  height: "5vh",
  boxSizing: "border-box",
  padding: "0px 20px",
  textAlign: "right",
  color: "#FFF",
  backgroundColor: "#4D4D4D",
  fontWeight: "500",
  lineHeight: "5vh",
};

const Footer = () => {
  return (
    <div className="footer" style={footerStyle}>
      <p style={{ margin: "0", opacity: "0" }}>Created by Marek Szczegodziński 2021</p>
    </div>
  );
};

export default Footer;
