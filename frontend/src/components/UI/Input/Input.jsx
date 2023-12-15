import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const inputChangeHandler = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className={classes["form-controls"]}>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        pattern={props.pattern}
        required
        onChange={props.readOnly ? () => null : inputChangeHandler}
        value={props.value}
      />
      <label htmlFor={props.name}>{props.label}</label>
      <div className={classes["bottom-border"]}></div>
    </div>
  );
};

export default Input;
