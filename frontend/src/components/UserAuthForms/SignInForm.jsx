import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import mainLogo from "../assets/todo.png";
import todoCoverImg from "../assets/main.jpg";
import { useAuth } from "../../store/AuthContext/AuthContextProvider";

const SignInForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { loginHandler } = useAuth();

  const navigate = useNavigate();

  const signInHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    await loginHandler(enteredEmail, enteredPassword);
    navigate("../todo/pending");
  };

  return (
    <div className={classes.container}>
      <div className={classes["cover-image-box"]}>
        <img src={todoCoverImg} alt="Todo List" />
      </div>
      <div>
        <div className={classes["child-container"]}>
          <section className={classes.logo}>
            <div className={classes["main-logo-auth"]}>
              <img src={mainLogo} alt="main-logo" />
            </div>
          </section>
          <p className={classes.heading}>
            Enter your credentials to access your account
          </p>
          <form className={classes.form} onSubmit={signInHandler}>
            <div className={classes["form-control"]}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="User ID"
                ref={emailInputRef}
              />
            </div>
            <div className={classes["form-control"]}>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                ref={passwordInputRef}
              />
            </div>
            <div className={classes["form-actions"]}>
              <button type="submit">SignIn</button>
            </div>
          </form>
        </div>
        <section className={classes.signup}>
          <p>
            Don't have an account?&nbsp;
            <Link to="../auth/signup">Sign Up</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default SignInForm;
