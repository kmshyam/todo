import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, className, type, onClick }) => {
  return (
    <button
      className={`${classes.btn} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
