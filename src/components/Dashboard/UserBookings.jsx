// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UserBookings = ({ userId }) => {
//   const [bookings, setBookings] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchUserBookings = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/users/${userId}/bookings`
//         );
//         setBookings(response.data.data);
//       } catch (error) {
//         console.error("Error fetching bookings", error);
//       }
//     };

//     fetchUserBookings();
//   }, [userId]);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         throw new Error("No token found, please log in again.");
//       }

//       console.log("Token sent with request:", token);

//       await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking._id !== bookingId)
//       );
//     } catch (error) {
//       console.error(
//         "Error canceling booking",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const handleViewDetails = (bookingId) => {
//     navigate(`/booking-details/${bookingId}`);
//   };

//   return (
//     <div>
//       <h2>Your Bookings</h2>
//       {bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <div
//             key={booking._id}
//             className="booking-item p-4 bg-white shadow mb-4 rounded-lg"
//           >
//             <p>
//               Facility: {booking.facility?.name || "Facility not available"}
//             </p>
//             <p>Date: {booking.date || "Date not available"}</p>
//             <p>
//               Time: {booking.startTime || "Start time not available"} -{" "}
//               {booking.endTime || "End time not available"}
//             </p>
//             <p>Status: {booking.isBooked || "Status not available"}</p>
//             <p>
//               Amount Paid: ${booking.payableAmount || "Amount not available"}
//             </p>
//             <div className="flex space-x-4 mt-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={() => handleViewDetails(booking._id)}
//               >
//                 View Details
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={() => handleCancelBooking(booking._id)}
//               >
//                 Cancel Booking
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default UserBookings;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

const UserBookings = ({ userId }) => {
  // console.log(userId);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const { apiCall, loading, error } = useApi();

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not defined.");
      return;
    }

    const fetchUserBookings = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: `http://localhost:5000/api/users/${userId}/bookings`,
        });
        // console.log("API Response:", response.data);
        setBookings(response.data.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchUserBookings();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await apiCall({
        method: "DELETE",
        url: `http://localhost:5000/api/bookings/${bookingId}`,
      });
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      console.error(
        "Error canceling booking:",
        err.response?.data || err.message
      );
    }
  };

  const handleViewDetails = (bookingId) => {
    navigate(`/booking-details/${bookingId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        <p>Error: {error.message || "An unexpected error occurred."}</p>
        {error.response?.status === 500 && (
          <p>It seems there is an issue on our end. Please try again later.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="booking-item p-4 bg-white shadow mb-4 rounded-lg"
          >
            <p>
              Facility: {booking.facility?.name || "Facility not available"}
            </p>
            <p>Date: {booking.date || "Date not available"}</p>
            <p>
              Time: {booking.startTime || "Start time not available"} -{" "}
              {booking.endTime || "End time not available"}
            </p>
            <p>Status: {booking.isBooked || "Status not available"}</p>
            <p>
              Amount Paid: ${booking.payableAmount || "Amount not available"}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleViewDetails(booking._id)}
              >
                View Details
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleCancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookings;
