import React from "react";
import classes from "./ErrorModal.module.css";
import Button from "../../Button/Button";

const ErrorModal = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.todoId);
  };
  return (
    <>
      <div className={classes.backdrop} onClick={props.onCancel} />
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button
            className={`${classes["cancel-btn"]} ${classes.btn}`}
            onClick={
              props.btn1 === "Okay" || props.btn1 === "Cancel"
                ? props.onCancel
                : props.onSuccess
            }
          >
            {props.btn1}
          </Button>
          {props.btn2 && (
            <Button
              className={`${classes["delete-btn"]} ${classes.btn}`}
              onClick={deleteHandler}
            >
              {props.btn2}
            </Button>
          )}
        </footer>
      </div>
    </>
  );
};

export default ErrorModal;
