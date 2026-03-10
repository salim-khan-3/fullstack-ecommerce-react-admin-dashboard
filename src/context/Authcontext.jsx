import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const isLoggedIn = !!token;

  const signin = async (email, password) => {
    const res = await axios.post("http://localhost:4000/api/user/signin", {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    return res.data;
  };

  // ==========================
  // SIGN UP
  // ==========================
  const signup = async (name, email, phone, password) => {
    const res = await axios.post("http://localhost:4000/api/user/signup", {
      name,
      email,
      phone,
      password,
    });
    return res.data;
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

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);