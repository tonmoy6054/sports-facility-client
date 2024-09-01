// /* eslint-disable no-unused-vars */
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const UserBookDetails = () => {
//   const { bookingId } = useParams();
//   console.log(bookingId);
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
//         const response = await axios.get(
//           `http://localhost:5000/api/bookings/${bookingId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setBooking(response.data.data);
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           setError("Unauthorized. Please log in.");
//         } else {
//           setError("Failed to fetch booking details.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [bookingId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
//       <div className="p-4 bg-white shadow rounded-lg">
//         <p>
//           <strong>Facility:</strong>{" "}
//           {booking?.facility?.name || "Facility not available"}
//         </p>
//         <p>
//           <strong>Date:</strong> {booking?.date || "Date not available"}
//         </p>
//         <p>
//           <strong>Time:</strong> {booking?.startTime} - {booking?.endTime}
//         </p>
//         <p>
//           <strong>Status:</strong> {booking?.isBooked || "Status not available"}
//         </p>
//         <p>
//           <strong>Amount Paid:</strong> $
//           {booking?.payableAmount || "Amount not available"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserBookDetails;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
// Adjust the import path accordingly

const UserBookDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const { apiCall, loading, error } = useApi(); // Use the custom hook for API calls

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: `http://localhost:5000/api/bookings/${bookingId}`,
        });
        setBooking(response.data.data);
      } catch (err) {
        // Error handling is already managed by the hook
        console.error("Error fetching booking details:", err);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <div className="p-4 bg-white shadow rounded-lg">
        <p>
          <strong>Facility:</strong>{" "}
          {booking?.facility?.name || "Facility not available"}
        </p>
        <p>
          <strong>Date:</strong> {booking?.date || "Date not available"}
        </p>
        <p>
          <strong>Time:</strong> {booking?.startTime} - {booking?.endTime}
        </p>
        <p>
          <strong>Status:</strong> {booking?.isBooked || "Status not available"}
        </p>
        <p>
          <strong>Amount Paid:</strong> $
          {booking?.payableAmount || "Amount not available"}
        </p>
      </div>
    </div>
  );
};

export default UserBookDetails;
