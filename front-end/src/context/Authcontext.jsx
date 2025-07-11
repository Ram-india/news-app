import { useNavigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext(); // ✅ Fix the name to AuthContext (capital "C")

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // optional: save token
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Now this will work properly
export const useAuth = () => useContext(AuthContext);