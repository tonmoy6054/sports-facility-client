import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch user role and userId from the API or local storage
    const userRole = localStorage.getItem("role") || "admin"; // Default to 'user'
    const storedUserId = localStorage.getItem("userId"); // Fetch the userId from local storage

    setRole(userRole);
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} userId={userId} />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex justify-between items-center p-6">
          {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
          {/* Back to Homepage link */}
          <Link
            to="/"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to Homepage
          </Link>
        </div>
        <main className="flex-grow p-6">
          {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
