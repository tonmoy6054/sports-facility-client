import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="px-6 py-4 text-lg font-semibold">
        {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </div>
      <nav className="flex-grow">
        {role === "admin" ? (
          <>
            <Link
              to="/admin/overview"
              className="block px-6 py-3 hover:bg-blue-700"
            >
              Overview
            </Link>
            <Link
              to="/admin/booking-management"
              className="block px-6 py-3 hover:bg-blue-700"
            >
              Booking Management
            </Link>
            <Link
              to="/admin/manage-facilities"
              className="block px-6 py-3 hover:bg-blue-700"
            >
              Manage Facilities
            </Link>
            <Link
              to="/admin/add-admin"
              className="block px-6 py-3 hover:bg-blue-700"
            >
              Add Admin
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/user/overview"
              className="block px-6 py-3 hover:bg-blue-700"
            >
              Overview
            </Link>
            <Link
              to="/user/bookings"
              className="block px-6 py-3 hover:bg-blue-700"
            >
              My Bookings
            </Link>
            <Link
              to="/user/profile"
              className="block px-6 py-3 hover:bg-blue-700"
            >
              My Profile
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
