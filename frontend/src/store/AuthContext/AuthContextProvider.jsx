import React, { useContext, useReducer } from "react";
import {
  getAuthToken,
  removeAuthToken,
} from "../../components/Utils/CheckAuth.jsx";
import AuthContext from "./auth-context.jsx";
import ErrorModal from "../../components/UI/Modal/ErrorModal/ErrorModal.jsx";

const url = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_PORT;

const tokenID = getAuthToken();

const initialTodoState = {
  popUp: "",
  login: {
    status: tokenID ? true : false,
    token: tokenID ? tokenID : "",
  },
  register: {
    status: tokenID ? true : false,
  },
};

const authReducerFn = (state, action) => {
  if (action.type === "ERR_POPUP") {
    return {
      ...state,
      popUp: action.payload,
    };
  }
  if (action.type === "HIDE_POPUP") {
    return {
      ...state,
      popUp: "",
    };
  }
  if (action.type === "SIGNUP_SUCCESS") {
    return {
      ...state,
      popUp: action.payload,
      register: { ...state.register, status: true },
    };
  }
  if (action.type === "SIGNIN_SUCCESS") {
    return {
      ...state,
      login: { ...state.login, status: true, token: action.payload },
      register: { ...state.register, status: true },
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      login: { ...state.login, status: false, token: "" },
      register: { ...state.register, status: false },
      popUp: "",
    };
  }
  return state;
};

const AuthContextProvider = (props) => {
  const [authState, dispatchAuthFn] = useReducer(
    authReducerFn,
    initialTodoState
  );

  const loginHandler = async (email, password) => {
    if (email.trim().length === 0 || password.length === 0) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Empty Fields",
          message: "All fields are mandatory!",
          btn1: "Okay",
        },
      });
      return;
    }
    if (!email.includes("@")) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Invalid email",
          message: "Please enter valid Email!",
          btn1: "Okay",
        },
      });
      return;
    }
    if (password.length < 6) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Invalid password",
          message: "Password should be greater than 6 characters long (> 6)!",
          btn1: "Okay",
        },
      });
      return;
    }
    try {
      const response = await fetch(`${url}:${port}/users/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === "Failed") {
        throw new Error(responseData.message);
      }
      const token = responseData.token;
      localStorage.setItem("TOKEN", token);
      dispatchAuthFn({
        type: "SIGNIN_SUCCESS",
        payload: token,
      });
    } catch (err) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Login unsuccessful",
          message: err.message,
          btn1: "Okay",
        },
      });
    }
  };

  const registerHandler = async (email, password, confirmPassword) => {
    if (
      email.trim().length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Empty Fields",
          message: "All fields are mandatory!",
          btn1: "Okay",
        },
      });
      return;
    }
    if (!email.includes("@")) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Invalid email",
          message: "Please enter valid Email!",
          btn1: "Okay",
        },
      });
      return;
    }
    if (password.length < 6) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Invalid password",
          message: "Password should be greater than 6 characters long (> 6)!",
          btn1: "Okay",
        },
      });
      return;
    }
    if (password !== confirmPassword) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "Password does not match",
          message: "Password and confirm password should be same!",
          btn1: "Okay",
        },
      });
      return;
    }
    try {
      const response = await fetch(`${url}:${port}/users/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === "Failed") {
        throw new Error(responseData.message);
      }
      dispatchAuthFn({
        type: "SIGNUP_SUCCESS",
        payload: {
          title: "Regitration Successful",
          message: "User registered successfully✅",
          btn1: "Okay",
        },
      });
    } catch (err) {
      dispatchAuthFn({
        type: "ERR_POPUP",
        payload: {
          title: "SignUp unsuccessful",
          message: err.message,
          btn1: "Okay",
        },
      });
    }
  };

  const cancelHandler = () => {
    dispatchAuthFn({ type: "HIDE_POPUP" });
  };

  const logoutHandler = async () => {
    await removeAuthToken();
    dispatchAuthFn({ type: "LOGOUT" });
  };

  return (
    <>
      {authState.popUp && (
        <ErrorModal
          title={authState.popUp.title}
          message={authState.popUp.message}
          onCancel={cancelHandler}
          btn1={authState.popUp.btn1}
        />
      )}
      <AuthContext.Provider
        value={{
          login: authState.login,
          register: authState.register,
          loginHandler,
          registerHandler,
          logoutHandler,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  return authCtx;
};

export default AuthContextProvider;
