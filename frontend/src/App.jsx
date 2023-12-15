import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todo from "./components/Todo/Todo";
import PageNotFound from "./components/UI/404/PageNotFound";
import { checkAuthLoader } from "./components/Utils/CheckAuth";
import SignUpForm from "./components/UserAuthForms/SignUpForm";
import SignInForm from "./components/UserAuthForms/SignInForm";
import TodoContextProvider from "./store/TodoContext/TodoContextProvider";
import TodoList from "./components/Todo/TodoList/TodoList";
import AuthContextProvider from "./store/AuthContext/AuthContextProvider";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todo />,
      loader: checkAuthLoader,
      children: [
        {
          path: "todo/:status",
          element: <TodoList />,
        },
      ],
    },
    { path: "auth/signup", element: <SignUpForm /> },
    { path: "auth/signin", element: <SignInForm /> },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <AuthContextProvider>
      <TodoContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </TodoContextProvider>
    </AuthContextProvider>
  );
};

export default App;
