import React from "react";
import classes from "./PageNotFound.module.css";
import PageNotFoundImage from "../../assets/404Error.gif";

const PageNotFound = () => {
  return (
    <div className={classes["page-not-found-container"]}>
      <img src={PageNotFoundImage} alt="Page Not Found" />
    </div>
  );
};

export default PageNotFound;
