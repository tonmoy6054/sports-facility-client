import { useState, useEffect, useContext } from "react";
import { useApi } from "../../hooks/useApi"; // Adjust the import path accordingly
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

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
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to fetch bookings"); // Optional: display a user-friendly error message
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Booking Management
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-bold text-gray-800">
                  {booking.facility
                    ? booking.facility.name
                    : "Unknown Facility"}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.isBooked
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.isBooked ? "Confirmed" : "Pending"}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Booking ID:</span>{" "}
                  {booking._id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Date:</span>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Start Time:</span>{" "}
                  {booking.startTime}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">End Time:</span>{" "}
                  {booking.endTime}
                </p>
                {booking.facility && booking.facility.description && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">
                      Description:
                    </span>{" "}
                    {booking.facility.description}
                  </p>
                )}
              </div>
            </div>
          ))}
          <Link to="/dashboard">
            <h2 className="font-bold cursor-pointer text-2xl mt-20">
              ↩️ Back to Dashboard
            </h2>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminBookingManagement;

// import { useState, useEffect, useContext } from "react";
// import { useApi } from "../../hooks/useApi"; // Adjust the import path accordingly
// import AuthContext from "../../context/AuthContext";

// const AdminBookingManagement = () => {
//   const [bookings, setBookings] = useState([]);
//   const { apiCall, loading } = useApi();
//   const { token } = useContext(AuthContext);
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await apiCall({
//           method: "GET",
//           url: "http://localhost:5000/api/bookings",
//           headers: {
//             Authorization: `Bearer ${token}`, // Replace with actual token
//           },
//         });
//         setBookings(response.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         alert("Failed to fetch bookings"); // Optional: display a user-friendly error message
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="container mx-auto p-6 bg-purple-500">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Booking Management
//       </h2>
//       {loading ? (
//         <p className="text-center text-gray-600">Loading bookings...</p>
//       ) : (
//         <ul className="space-y-4">
//           {bookings.map((booking) => (
//             <li key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
//               <p className="text-xl font-semibold text-gray-800">
//                 Booking ID: <span className="text-gray-600">{booking._id}</span>
//               </p>
//               <p className="text-lg text-gray-800">
//                 Facility:{" "}
//                 <span className="text-gray-600">
//                   {booking.facility
//                     ? booking.facility.name
//                     : "No facility assigned"}
//                 </span>
//               </p>
//               <p className="text-gray-700">
//                 Description:{" "}
//                 <span className="text-gray-600">
//                   {booking.facility
//                     ? booking.facility.description
//                     : "No description available"}
//                 </span>
//               </p>
//               <p className="text-gray-700">
//                 Date: <span className="text-gray-600">{booking.date}</span>
//               </p>
//               <p className="text-gray-700">
//                 Start Time:{" "}
//                 <span className="text-gray-600">{booking.startTime}</span>
//               </p>
//               <p className="text-gray-700">
//                 End Time:{" "}
//                 <span className="text-gray-600">{booking.endTime}</span>
//               </p>
//               <p className="text-gray-700">
//                 Status:{" "}
//                 <span
//                   className={`${
//                     booking.isBooked ? "text-green-500" : "text-red-500"
//                   } font-medium`}
//                 >
//                   {booking.isBooked ? "Confirmed" : "Pending"}
//                 </span>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AdminBookingManagement;
