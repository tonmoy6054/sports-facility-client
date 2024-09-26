import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { apiCall, loading, error } = useApi();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/user-info", // Assuming you have a 'me' route for the current user
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response);
        if (response.data && response.data) {
          setUser(response.data); // Set user data from the response
        } else {
          console.error("User data not found in response");
        }
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
      {user ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-24">Name:</span>
              <span className="text-gray-800">{user.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-24">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-24">Phone:</span>
              <span className="text-gray-800">{user.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-24">Address:</span>
              <span className="text-gray-800">{user.address}</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/edit-profile")}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No user data available</p>
      )}
    </div>
  );
};

export default UserProfile;
