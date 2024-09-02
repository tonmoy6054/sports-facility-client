// import axios from "axios";
// import { useEffect, useState } from "react";
// import AdminFacilityManagement from "./AdminFacilityManagement";
// import AdminBookingManagement from "./AdminBookingManagement";
// import AddAdmin from "./AddAdmin";

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/user-info",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         const newToken = response.data.newToken; // Assuming the new token is sent back with the response
//         if (newToken) {
//           localStorage.setItem("token", newToken); // Update localStorage with the new token
//         }

//         setUser(response.data.data); // Set the user data with the response
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   return (
//     <div>
//       {user ? <h1>Welcome back, {user.name}!</h1> : <p>Loading user info...</p>}
//       <br></br>
//       <AdminFacilityManagement />
//       <br></br>
//       <AdminBookingManagement />
//       <br></br>
//       <AddAdmin />
//     </div>
//   );
// };

// export default AdminDashboard;

import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import AuthContext from "../../context/AuthContext";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const { apiCall, loading } = useApi();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        console.warn("No token found, cannot fetch user info");
        return;
      }

      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/user-info",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newToken = response.data.newToken;
        if (newToken) {
          localStorage.setItem("token", newToken); // Update the token if the server provides a new one
        }

        setUser(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error (e.g., redirect to login)
          alert("Session expired. Please log in again.");
          // Redirect to login page logic
        } else {
          console.error("Error fetching user info:", error);
          alert("Failed to fetch user info");
        }
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p>Loading user info...</p> // Display a loading message while fetching data
      ) : user ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Welcome back, {user.name}!
          </h1>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCmjBwc8yeXKjRXRyqC1lYSlcQvRwt_lpxLEdIr1dLh8Ajz77jvWgIGfJlA&s" // Replace with your image path
            alt="Welcome"
            className="w-48 h-48 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-700">We’re glad to see you again.</p>
        </div>
      ) : (
        <p>No user info available</p>
      )}
    </div>
  );
};

export default AdminDashboard;
