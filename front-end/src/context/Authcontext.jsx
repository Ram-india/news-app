import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createContext } from "react";



const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const login = (userData) =>{
        setUser(userData);
        navigate("/");
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <Authcontext.Provider value={{ user, login, logout }}>
            {children}
        </Authcontext.Provider>
    );

}
export default Authcontext;