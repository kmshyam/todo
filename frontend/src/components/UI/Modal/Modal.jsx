import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ModalOverlay = ({
  title,
  btnName,
  type,
  editTodo,
  onAddTodo,
  onEditTodo,
  onCancel,
}) => {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    editTodo ? setTodo(editTodo.todo.todo) : setTodo("");
  }, [editTodo]);

  const todoInputChangeHandler = (todo) => {
    setTodo(todo);
  };

  const submitTodoFormHandler = (e) => {
    e.preventDefault();
    const todoItem = {
      id: Math.random().toString(),
      todo,
      status: "Pending",
    };
    type === "add" && onAddTodo(todoItem);
    type === "edit" && onEditTodo(todo, editTodo.todo_id);
    onCancel();
  };

  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
        <FontAwesomeIcon
          icon={faClose}
          className={classes["close-icon"]}
          onClick={onCancel}
        />
      </header>
      <section className={classes["content-container"]}>
        <form className={classes.form} onSubmit={submitTodoFormHandler}>
          <Input
            type="text"
            label="Enter todo"
            name="todo_input"
            onChange={todoInputChangeHandler}
            value={todo}
            required
          />
          <div className={classes["form-actions"]}>
            <Button className={classes["add-btn"]} type="submit">
              {btnName}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

const Modal = ({
  title,
  btnName,
  type,
  editTodo,
  onAddTodo,
  onEditTodo,
  onCancel,
}) => {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const escapeHandler = (e) => {
      if (e.keyCode === 27) {
        setModalOpen(false);
        onCancel();
      }
    };
    if (modalOpen) {
      document.addEventListener("keydown", escapeHandler);
    }
  }, [modalOpen, onCancel]);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onCancel} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          btnName={btnName}
          type={type}
          editTodo={editTodo}
          onAddTodo={onAddTodo}
          onEditTodo={onEditTodo}
          onCancel={onCancel}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
