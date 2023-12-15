import React, { useState } from "react";
import classes from "./TodoList.module.css";
import { useTodo } from "../../../store/TodoContext/TodoContextProvider";
import TodoItem from "../TodoItem/TodoItem";
import { useLocation } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import { getTokenDetails } from "../../Utils/CheckAuth";

const TodoList = () => {
  const [showEditTodoModal, setShowEditTodoModal] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const {
    pendingTodos,
    completedTodos,
    editTodoHandler,
    deleteTodoHandler,
    completeTodoHandler,
    revertTodoHandler,
  } = useTodo();
  const location = useLocation();

  const tokenDetails = getTokenDetails();

  const getTodosList = () => {
    let allTodos, content;
    if (location.pathname === "/todo/pending") {
      allTodos = pendingTodos?.filter(
        (todo) => todo.userID === tokenDetails?.userID
      );
      content =
        "Oops! It looks like there are no todo items. Why not add one now?";
    }
    if (location.pathname === "/todo/completed") {
      allTodos = completedTodos?.filter(
        (todo) => todo.userID === tokenDetails?.userID
      );
      content =
        "Oops! It looks like there are no todo items. Kindly complete the pending task!";
    }
    return { allTodos, content };
  };

  const showEditTodoFormHandler = (todo) => {
    setEditTodo(todo);
    setShowEditTodoModal(true);
  };

  const editTodoItemHandler = (todo, todoId) => {
    editTodoHandler(todo, todoId);
  };

  const deleteTodoItemHandler = (todoId) => {
    deleteTodoHandler(todoId);
  };

  const completeTodoItemHandler = (todoId) => {
    completeTodoHandler(todoId);
  };

  const revertTodoItemHandler = (todoId) => {
    revertTodoHandler(todoId);
  };

  const closeEditTodoModalHandler = () => {
    setShowEditTodoModal(false);
  };

  return (
    <>
      {showEditTodoModal && (
        <Modal
          title="Edit Todo Form"
          btnName="Update Todo"
          type="edit"
          editTodo={editTodo}
          onEditTodo={editTodoItemHandler}
          onCancel={closeEditTodoModalHandler}
        />
      )}
      {getTodosList().allTodos.length > 0 ? (
        <ul className={classes["todo-lists-container"]}>
          {getTodosList().allTodos.map((todo) => (
            <TodoItem
              key={Math.random().toString()}
              todo={todo}
              onEdit={showEditTodoFormHandler}
              onDelete={deleteTodoItemHandler}
              onComplete={completeTodoItemHandler}
              onRevert={revertTodoItemHandler}
            />
          ))}
        </ul>
      ) : (
        <section>
          <p className={classes["no-data-box"]}>{getTodosList().content}</p>
        </section>
      )}
    </>
  );
};

export default TodoList;
