import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import mainLogo from "../assets/todo.png";
import todoCoverImg from "../assets/main.jpg";
import { useAuth } from "../../store/AuthContext/AuthContextProvider";

const SignUpForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const { registerHandler } = useAuth();

  const navigate = useNavigate();

  const signUpHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    await registerHandler(
      enteredEmail,
      enteredPassword,
      enteredConfirmPassword
    );
    enteredEmail.trim().length === 0 ||
      enteredPassword.length === 0 ||
      !enteredEmail.includes("@") ||
      enteredPassword.length < 6 ||
      navigate("../auth/signin");
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
          <p className={classes.heading}>Create New Account</p>
          <form className={classes.form} onSubmit={signUpHandler}>
            <div className={classes["form-control"]}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email ID"
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
            <div className={classes["form-control"]}>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                ref={confirmPasswordInputRef}
              />
            </div>
            <div className={classes["form-actions"]}>
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
        <section className={classes.signin}>
          <p>
            Already registered?&nbsp;
            <Link to="../auth/signin">Sign In</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default SignUpForm;
