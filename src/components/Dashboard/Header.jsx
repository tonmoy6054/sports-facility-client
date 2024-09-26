// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   return (
//     <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
//       <div>
//         <button
//           onClick={handleLogout}
//           className="text-blue-600 hover:underline"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
      <div>
        <button
          onClick={handleLogout}
          className="text-blue-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
