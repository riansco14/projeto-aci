import * as authService from "../services/authService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser) setUser(parsedUser);
      } catch (error) {}
    }
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success) setUser(response.user);
    localStorage.setItem("user", JSON.stringify(response.user)); // <-- salva no localStorage
    return response;
  };

  const register = async (credentials) => {
    const response = await authService.registerUser(credentials);
    if (response.success) setUser(response.user);
    localStorage.setItem("user", JSON.stringify(response.user)); // <-- salva no localStorage
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // <-- remove ao deslogar
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
