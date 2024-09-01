// import { useEffect, useState } from "react";
// import UserBookings from "./UserBookings";
// import axios from "axios";

// const UserDashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users");
//         const userData = response.data.data;
//         if (userData && userData.length > 0) {
//           setUser(userData[0]); // Adjust based on actual data structure
//         } else {
//           console.error("No user data found");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <div className="p-4 bg-blue-100 text-blue-800 rounded">
//         {user ? <h1>Welcome, {user.name}!</h1> : <p>Loading...</p>}
//       </div>
//       {user && <UserBookings userId={user._id} />}{" "}
//     </div>
//   );
// };

// export default UserDashboard;

import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import UserBookings from "../Dashboard/UserBookings";
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
          url: "http://localhost:5000/api/users",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.data;
        if (userData && userData.length > 0) {
          setUser(userData[0]); // Adjust based on actual data structure
        } else {
          console.error("No user data found");
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading)
    return <div className="container mx-auto p-6">Loading user data...</div>;
  if (error)
    return <div className="container mx-auto p-6">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 flex items-center space-x-6">
        <div className="flex-shrink-0">
          <img
            className="h-32 w-32 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCmjBwc8yeXKjRXRyqC1lYSlcQvRwt_lpxLEdIr1dLh8Ajz77jvWgIGfJlA&s"
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
      {user && console.log("Rendering UserBookings with userId:", user._id)}
      {user && <UserBookings userId={user._id} />}
    </div>
  );
};

export default UserDashboard;
