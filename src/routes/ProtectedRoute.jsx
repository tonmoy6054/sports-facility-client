import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? element : <Navigate to="/sign" replace />;
};

export default ProtectedRoute;

// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { token } = useContext(AuthContext);
//   console.log("Token:", token);

//   // If there's no token, redirect to the login page
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Otherwise, render the children components
//   return children;
// };

// export default ProtectedRoute;
