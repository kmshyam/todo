import React from "react";
import classes from "./TodoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClockFour,
  faEdit,
  faRotateBackward,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button/Button";
import { calculateDateTime } from "../../Utils/CalculateDateTime";

const TodoItem = ({ todo, onEdit, onDelete, onComplete, onRevert }) => {
  const { formattedDate, formattedTime } = calculateDateTime(todo.updatedAt);
  return (
    <li className={classes["todo-list-box"]}>
      <header className={classes.header}>
        <div className={classes["time-box"]}>
          <FontAwesomeIcon
            icon={faClockFour}
            className={classes["time-icon"]}
          />
          <p>{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>
        {todo.todo.status === "Pending" && (
          <div className={classes["actions-container"]}>
            <FontAwesomeIcon
              icon={faEdit}
              className={classes["edit-icon"]}
              onClick={() => onEdit(todo)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className={classes["delete-icon"]}
              onClick={() => onDelete(todo.todo_id)}
            />
          </div>
        )}
        {todo.todo.status === "Completed" && (
          <FontAwesomeIcon
            icon={faRotateBackward}
            className={classes["revert-icon"]}
            onClick={() => onRevert(todo.todo_id)}
          />
        )}
      </header>
      <main className={classes["todo-content-box"]}>
        <p>{todo.todo.todo}</p>
        {todo.todo.status === "Pending" && (
          <Button
            className={classes["complete-btn"]}
            onClick={() => onComplete(todo.todo_id)}
          >
            Completed
          </Button>
        )}
        {todo.todo.status === "Completed" && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={classes["check-icon"]}
          />
        )}
      </main>
    </li>
  );
};

export default TodoItem;
