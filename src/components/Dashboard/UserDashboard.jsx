import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

import AuthContext from "../../context/AuthContext";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const { apiCall, loading, error } = useApi();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/user-info",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        console.log(userData);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (loading)
    return <div className="container mx-auto p-6">Loading user data...</div>;
  if (error)
    return (
      <div className="container mx-auto p-6">
        Error: Unable to load user data. Please try again later.
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 flex items-center space-x-6">
        <div className="flex-shrink-0">
          <img
            className="h-32 w-32 rounded-full"
            src={
              user?.profileImageUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCmjBwc8yeXKjRXRyqC1lYSlcQvRwt_lpxLEdIr1dLh8Ajz77jvWgIGfJlA&s"
            }
            alt="User Profile"
          />
        </div>
        <div>
          {user ? (
            <>
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome, {user.name}!
              </h1>
              <p className="mt-2 text-gray-600">
                We are glad to have you back. Check your bookings and manage
                your profile easily.
              </p>
            </>
          ) : (
            <p className="text-gray-600">No user data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
