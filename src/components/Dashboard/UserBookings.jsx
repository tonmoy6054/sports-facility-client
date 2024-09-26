// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import AuthContext from "../../context/AuthContext";

// const UserBookings = () => {
//   const { userId } = useParams();
//   console.log(userId);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { token } = useContext(AuthContext); // Move the useContext hook back to the top level

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/users/${userId}/bookings`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("API Response:", response.data); // Log the full API response

//         const bookingsData = response.data || [];
//         setBookings(bookingsData);
//       } catch (err) {
//         const errorMsg =
//           err.response?.data?.message || "Failed to fetch bookings.";
//         setError(errorMsg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [userId, token]);

//   const handleViewDetails = (bookingId) => {
//     navigate(`/bookings/${bookingId}`); // Navigate to the booking details page
//   };

//   const handleCancel = async (bookingId) => {
//     console.log("JWT Token:", token); // Log the token for debugging

//     if (!token) {
//       alert("You need to be logged in to cancel a booking.");
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Send the token in the Authorization header
//         },
//       });

//       setBookings(bookings.filter((booking) => booking._id !== bookingId));
//       alert("Booking canceled successfully!");
//     } catch (err) {
//       console.error("Error:", err.response || err.message);
//       alert("Failed to cancel the booking.");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {bookings.map((booking) => (
//             <li key={booking._id} className="p-4 bg-white shadow-md rounded">
//               <div>
//                 <strong>Date:</strong>{" "}
//                 {new Date(booking.date).toLocaleDateString()}
//               </div>
//               <div>
//                 <strong>Time:</strong> {booking.startTime} - {booking.endTime}
//               </div>
//               <div>
//                 <strong>Facility:</strong>{" "}
//                 {booking.facility
//                   ? booking.facility.name
//                   : "Facility not available"}
//               </div>
//               <div>
//                 <strong>Amount:</strong> ${booking.payableAmount}
//               </div>
//               <div className="mt-4">
//                 <button
//                   onClick={() => handleCancel(booking._id)}
//                   className="bg-red-600 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleViewDetails(booking._id)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserBookings;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const UserBookings = () => {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);

        const bookingsData = response.data || [];
        setBookings(bookingsData);
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Failed to fetch bookings.";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, token]);

  const handleViewDetails = (bookingId) => {
    navigate(`/bookings/${bookingId}`);
  };

  const handleCancel = async (bookingId) => {
    if (!token) {
      alert("You need to be logged in to cancel a booking.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert("Booking canceled successfully!");
    } catch (err) {
      console.error("Error:", err.response || err.message);
      alert("Failed to cancel the booking.");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No bookings found.</p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <strong className="text-gray-600">Date:</strong>{" "}
                  <span className="text-gray-800">
                    {new Date(booking.date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-600">Time:</strong>{" "}
                  <span className="text-gray-800">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-600">Facility:</strong>{" "}
                  <span className="text-gray-800">
                    {booking.facility && booking.facility
                      ? booking.facility
                      : "Facility not available"}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-600">Amount:</strong>{" "}
                  <span className="text-gray-800">
                    ${booking.payableAmount}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleViewDetails(booking._id)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBookings;
