import React, { useState } from "react";
import classes from "./Todo.module.css";
import TodoNavigation from "./TodoNavigation/TodoNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import { useTodo } from "../../store/TodoContext/TodoContextProvider";
import createTodoImg from "../assets/todo.png";
import userImg from "../assets/user.png";
import { getTokenDetails } from "../Utils/CheckAuth";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../UI/Button/Button";
import TodoChartView from "./TodoChartView/TodoChartView";
import { useAuth } from "../../store/AuthContext/AuthContextProvider";

const userMenuOptions = [
  {
    id: 1,
    icon: faSignOut,
    name: "Logout",
  },
];

const Todo = () => {
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showChartData, setShowChartData] = useState(false);
  const { pendingTodos, completedTodos, addTodoHandler } = useTodo();
  const { logoutHandler } = useAuth();
  const navigate = useNavigate();

  const tokenDetails = getTokenDetails();

  const addTodoItemHandler = (todo) => {
    addTodoHandler(todo);
  };

  const addTodoClickHandler = () => {
    setShowAddTodoModal(true);
  };

  const closeAddTodoModalHandler = () => {
    setShowAddTodoModal(false);
  };

  const menuItemClickHandler = async (menuItem) => {
    if (menuItem.name === "Logout") {
      await logoutHandler();
      navigate("../auth/signin");
    }
  };

  const showChartHandler = () => {
    setShowChartData(true);
  };

  const closeChartViewHandler = () => {
    setShowChartData(false);
  };

  return (
    <>
      {showAddTodoModal && (
        <Modal
          title="Add Todo Form"
          btnName="Add Todo"
          type="add"
          onAddTodo={addTodoItemHandler}
          onCancel={closeAddTodoModalHandler}
        />
      )}
      {showChartData && (
        <TodoChartView
          title="Pending Todos Vs Completed Todos"
          pendingTodos={pendingTodos}
          completedTodos={completedTodos}
          onClose={closeChartViewHandler}
        />
      )}
      <div className={classes["todo-container"]}>
        <header className={classes.header}>
          <h2>Todo Application</h2>
          <div
            className={classes["add-todo-container"]}
            onClick={addTodoClickHandler}
          >
            <div className={classes["add-todo-box"]}>
              <img src={createTodoImg} alt="Todo" />
            </div>
            <p>Add Todo</p>
          </div>
          <Button
            className={classes["chart-view-btn"]}
            onClick={showChartHandler}
          >
            Chart View
          </Button>
          <div className={classes["user-details-container"]}>
            <div
              className={classes["user-image-box"]}
              onClick={() => setShowUserProfile((prevData) => !prevData)}
            >
              <img src={userImg} alt="User icon" />
            </div>
            {showUserProfile && (
              <div className={classes["user-profile-container"]}>
                <div className={classes["user-details-box"]}>
                  <h4>User ID </h4>
                  <p>: {tokenDetails?.userID}</p>
                  <h4>Username </h4>
                  <p>: {tokenDetails?.username}</p>
                  <h4>Email </h4>
                  <p>: {tokenDetails?.email}</p>
                </div>
                <div className={classes.line} />
                <ul className={classes["menu-items-box"]}>
                  {userMenuOptions.map((menuItem, index) => (
                    <li
                      key={index}
                      className={classes["menu-item"]}
                      onClick={() => menuItemClickHandler(menuItem)}
                    >
                      <FontAwesomeIcon
                        icon={menuItem.icon}
                        className={classes["menu-icon"]}
                      />
                      <p>{menuItem.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>
        <TodoNavigation />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Todo;
