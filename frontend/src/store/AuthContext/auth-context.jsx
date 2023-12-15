import { createContext } from "react";

const AuthContext = createContext({
  login: {},
  register: {},
  loginHandler: () => {},
  registerHandler: () => {},
  logoutHandler: () => {},
});

export default AuthContext;
