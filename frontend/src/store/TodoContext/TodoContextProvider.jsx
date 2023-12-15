import React, { useEffect, useContext, useReducer } from "react";
import { getAuthToken } from "../../components/Utils/CheckAuth.jsx";
import TodoContext from "./todo-context";
import { useAuth } from "../AuthContext/AuthContextProvider.jsx";

const url = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_PORT;

const initialTodoState = {
  todos: [],
  pendingTodos: [],
  completedTodos: [],
  status: {},
};

const todoReducerFn = (state, action) => {
  if (action.type === "FETCH_TODOS") {
    return {
      ...state,
      todos: action.payload.todos,
      pendingTodos: action.payload.pendingTodos,
      completedTodos: action.payload.completedTodos,
      status: action.payload.status,
    };
  }
  if (action.type === "STATUS_UPDATE") {
    return {
      ...state,
      status: action.payload.status,
    };
  }
  return state;
};

const TodoContextProvider = (props) => {
  const [todoState, dispatchTodoFn] = useReducer(
    todoReducerFn,
    initialTodoState
  );
  const { login } = useAuth();
  const token = getAuthToken();

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const response = await fetch(`${url}:${port}/todo/all`, {
          method: "GET",
          headers: {
            Authorization: getAuthToken(),
          },
        });
        const data = await response.json();

        const pendingTodos = [];
        const completedTodos = [];

        for (let i = 0; i < data.todos?.length; i++) {
          let todoItem = data.todos[i];
          if (todoItem.todo.status === "Pending") {
            pendingTodos.push(todoItem);
          }
          if (todoItem.todo.status === "Completed") {
            completedTodos.push(todoItem);
          }
        }
        dispatchTodoFn({
          type: "FETCH_TODOS",
          payload: {
            todos: data.todos,
            pendingTodos,
            completedTodos,
            status: data.message,
          },
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllTodos();
  }, [todoState.status, login.status]);

  const addTodoHandler = async (todo) => {
    try {
      const response = await fetch(`${url}:${port}/todo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      dispatchTodoFn({
        type: "STATUS_UPDATE",
        payload: { status: data.message },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const editTodoHandler = async (todo, todoId) => {
    try {
      const response = await fetch(
        `${url}:${port}/todo/edit?todo=${todo}&todoId=${todoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      dispatchTodoFn({
        type: "STATUS_UPDATE",
        payload: { status: data.message },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTodoHandler = async (todoId) => {
    try {
      const response = await fetch(
        `${url}:${port}/todo/delete?todoId=${todoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      dispatchTodoFn({
        type: "STATUS_UPDATE",
        payload: { status: data.message },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const completeTodoHandler = async (todoId) => {
    try {
      const response = await fetch(
        `${url}:${port}/todo/complete?todoId=${todoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      dispatchTodoFn({
        type: "STATUS_UPDATE",
        payload: { status: data.message },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const revertTodoHandler = async (todoId) => {
    try {
      const response = await fetch(
        `${url}:${port}/todo/revert?todoId=${todoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      dispatchTodoFn({
        type: "STATUS_UPDATE",
        payload: { status: data.message },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todoState.todos,
        pendingTodos: todoState.pendingTodos,
        completedTodos: todoState.completedTodos,
        addTodoHandler,
        editTodoHandler,
        deleteTodoHandler,
        completeTodoHandler,
        revertTodoHandler,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const todoCtx = useContext(TodoContext);
  return todoCtx;
};

export default TodoContextProvider;
