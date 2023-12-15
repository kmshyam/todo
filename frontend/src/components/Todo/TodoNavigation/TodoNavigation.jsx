import React from "react";
import classes from "./TodoNavigation.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const todoNavItems = [
  {
    id: 1,
    name: "Pending Todos",
    path: "/todo/pending",
  },
  {
    id: 2,
    name: "Completed Todos",
    path: "/todo/completed",
  },
];

const TodoNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItemChangeHandler = (name) => {
    if (name === "Pending Todos") {
      navigate("../todo/pending");
    }
    if (name === "Completed Todos") {
      navigate("../todo/completed");
    }
  };

  return (
    <ul className={classes["nav-item-lists"]}>
      {todoNavItems.map((navItem, index) => (
        <li
          key={index}
          className={`${classes["nav-item-list"]} ${
            navItem.path === location.pathname && classes.active
          }`}
          onClick={() => navItemChangeHandler(navItem.name)}
        >
          {navItem.name}
        </li>
      ))}
    </ul>
  );
};

export default TodoNavigation;
