// // import AdminDashboard from "./AdminDashboard";
// import UserDashboard from "./UserDashboard";

// const Dashboard = () => {
//   return (
//     <div className="container mx-auto p-6">
//       {/* {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
//        */}
//       <UserDashboard />
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch user role from the API or local storage
    const userRole = localStorage.getItem("role") || "admin"; // Default to 'user'
    setRole(userRole);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-6">
          {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
