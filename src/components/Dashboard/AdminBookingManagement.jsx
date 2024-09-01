// import { useState, useEffect } from "react";
// import axios from "axios";

// const AdminBookingManagement = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/bookings", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setBookings(response.data.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div>
//       <h2>Booking Management</h2>
//       <ul>
//         {bookings.map((booking) => (
//           <li key={booking._id}>
//             <p>Booking ID: {booking._id}</p>
//             <p>Facility: {booking.facility}</p>
//             <p>Date: {booking.date}</p>
//             <p>Start Time: {booking.startTime}</p>
//             <p>End Time: {booking.endTime}</p>
//             <p>Status: {booking.isBooked}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminBookingManagement;

import { useState, useEffect, useContext } from "react";
import { useApi } from "../../hooks/useApi"; // Adjust the import path accordingly
import AuthContext from "../../context/AuthContext";

const AdminBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const { apiCall, loading } = useApi();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/bookings",
          headers: {
            Authorization: `Bearer ${token}`, // Replace with actual token
          },
        });
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to fetch bookings"); // Optional: display a user-friendly error message
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-purple-500">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Booking Management
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading bookings...</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-gray-800">
                Booking ID: <span className="text-gray-600">{booking._id}</span>
              </p>
              <p className="text-lg text-gray-800">
                Facility:{" "}
                <span className="text-gray-600">
                  {booking.facility
                    ? booking.facility.name
                    : "No facility assigned"}
                </span>
              </p>
              <p className="text-gray-700">
                Description:{" "}
                <span className="text-gray-600">
                  {booking.facility
                    ? booking.facility.description
                    : "No description available"}
                </span>
              </p>
              <p className="text-gray-700">
                Date: <span className="text-gray-600">{booking.date}</span>
              </p>
              <p className="text-gray-700">
                Start Time:{" "}
                <span className="text-gray-600">{booking.startTime}</span>
              </p>
              <p className="text-gray-700">
                End Time:{" "}
                <span className="text-gray-600">{booking.endTime}</span>
              </p>
              <p className="text-gray-700">
                Status:{" "}
                <span
                  className={`${
                    booking.isBooked ? "text-green-500" : "text-red-500"
                  } font-medium`}
                >
                  {booking.isBooked ? "Confirmed" : "Pending"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminBookingManagement;
