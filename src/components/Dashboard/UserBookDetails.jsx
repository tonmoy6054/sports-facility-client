// import { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AuthContext from "../../context/AuthContext";

// const UserBookingDetails = () => {
//   const { bookingId } = useParams();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/bookings/${bookingId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log(response.data);
//         if (response.data && response.data.data) {
//           setBooking(response.data.data);
//         } else {
//           setBooking(null);
//           console.warn("No booking data available");
//         }
//       } catch (err) {
//         const errorMsg =
//           err.response?.data?.message || "Failed to fetch booking details.";
//         setError(errorMsg);
//         console.error("Error fetching booking details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [bookingId, token]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {booking ? (
//         <div className="p-4 bg-white shadow-md rounded">
//           <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
//           <div>
//             <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
//           </div>
//           <div>
//             <strong>Time:</strong> {booking.startTime} - {booking.endTime}
//           </div>
//           <div>
//             <strong>Facility:</strong>{" "}
//             {booking.facility && booking.facility.name
//               ? booking.facility.name
//               : "Facility not available"}
//           </div>
//           <div>
//             <strong>Amount:</strong> ${booking.payableAmount.toFixed(2)}
//           </div>
//           <div>
//             <strong>Status:</strong>{" "}
//             {booking.isBooked === "confirmed"
//               ? "Confirmed"
//               : booking.isBooked === "pending"
//               ? "Pending"
//               : "Canceled"}
//           </div>
//         </div>
//       ) : (
//         <p>No booking details available.</p>
//       )}
//     </div>
//   );
// };

// export default UserBookingDetails;

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const UserBookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        if (response.data && response.data.data) {
          setBooking(response.data.data);
        } else {
          setBooking(null);
          console.warn("No booking data available");
        }
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Failed to fetch booking details.";
        setError(errorMsg);
        console.error("Error fetching booking details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, token]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      {booking ? (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Booking Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="flex items-center">
              <strong className="text-gray-600 mr-2">Date:</strong>
              <span className="text-gray-800">
                {new Date(booking.date).toLocaleDateString()}
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center">
              <strong className="text-gray-600 mr-2">Time:</strong>
              <span className="text-gray-800">
                {booking.startTime} - {booking.endTime}
              </span>
            </div>

            {/* Facility */}
            <div className="flex items-center">
              <strong className="text-gray-600 mr-2">Facility:</strong>
              <span className="text-gray-800">
                {booking.facility && booking.facility.name
                  ? booking.facility.name
                  : "Facility not available"}
              </span>
            </div>

            {/* Payable Amount */}
            <div className="flex items-center">
              <strong className="text-gray-600 mr-2">Amount:</strong>
              <span className="text-gray-800">
                ${booking.payableAmount.toFixed(2)}
              </span>
            </div>

            {/* Booking Status */}
            <div className="flex items-center">
              <strong className="text-gray-600 mr-2">Status:</strong>
              <span
                className={`px-3 py-1 rounded-full font-semibold text-sm ${
                  booking.isBooked === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : booking.isBooked === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {booking.isBooked === "confirmed"
                  ? "Confirmed"
                  : booking.isBooked === "pending"
                  ? "Pending"
                  : "Canceled"}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition duration-300"
              onClick={() => window.history.back()}
            >
              Back to Bookings
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">
          No booking details available.
        </p>
      )}
    </div>
  );
};

export default UserBookingDetails;
