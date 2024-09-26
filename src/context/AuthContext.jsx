import { createContext, useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { apiCall } = useApi();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          const response = await apiCall({
            method: "GET",
            url: "http://localhost:5000/api/user-info",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (err) {
          console.error("Failed to fetch user info:", err);
          toast.error("Failed to fetch user info. Please log in again."); // Notify the user
          logout(); // Clear token and user info if the request fails
        }
      } else {
        setUser(null); // Clear user state if token is null
      }
    };

    fetchUserInfo();
  }, [token]); // Dependency on token only

  const login = (newToken) => {
    if (newToken) {
      console.log("Setting new token:", newToken); // Debugging log
      setToken(newToken);
      localStorage.setItem("authToken", newToken);
    } else {
      console.error("No token provided during login");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
