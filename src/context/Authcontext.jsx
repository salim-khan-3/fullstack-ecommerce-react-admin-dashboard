import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { signinUser, signupUser } from "../api/useApi";
// import { signinUser, signupUser } from "../api/userApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const isLoggedIn = !!token;

  // ==========================
  // SIGN IN
  // ==========================
  const signin = async (email, password) => {
    const data = await signinUser(email, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  // ==========================
  // SIGN UP
  // ==========================
  const signup = async (name, email, phone, password) => {
    const data = await signupUser(name, email, phone, password);
    return data;
  };

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateUser = (updatedUser) => {
  const merged = { ...user, ...updatedUser };
  localStorage.setItem("user", JSON.stringify(merged));
  setUser(merged);
};
  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, signin, signup, logout,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);