// import { createContext, useState, useEffect } from "react";
// import { useApi } from "../hooks/useApi";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const { apiCall } = useApi();
//   const [token, setToken] = useState(localStorage.getItem("authToken") || null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Optionally, load user data from an API using the token
//     if (token) {
//       // Fetch user info using token
//       apiCall({
//         method: "GET",
//         url: "http://localhost:5000/api/user-info",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => {
//           setUser(response.data);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch user info:", err);
//         });
//     }
//   }, [token]);

//   const login = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("authToken", newToken);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("authToken");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { apiCall } = useApi();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      apiCall({
        method: "GET",
        url: "http://localhost:5000/api/user-info",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          logout(); // Clear token and user info if the request fails
        });
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
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
