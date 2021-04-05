import React from "react";
import "../../utils/customStyles.css";

const footerStyle = {
  boxSizing: "border-box",
  padding: "10px 20px",
  textAlign: "right",
  color: "#eee",
  backgroundColor: "#4D4D4D",
  fontWeight: "500",
};

const Footer = () => {
  return (
    <div className="footer" style={footerStyle}>
      <div style={{ margin: "0", opacity: "0" }}>Created by Marek Szczegodziński 2021</div>
    </div>
  );
};

export default Footer;
