import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const checkAuthLoader = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return redirect("/auth/signin");
  }
  return null;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return null;
  }
  return token;
};

export const removeAuthToken = () => {
  return localStorage.removeItem("TOKEN");
};

export const getTokenDetails = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};
