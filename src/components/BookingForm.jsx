// import { useState, useEffect } from "react";
// import axios from "axios";
// import BookingSummary from "./BookingSummary";
// import PaymentButton from "./Facility/PaymentButton";

// const BookingForm = () => {
//   const [facilities, setFacilities] = useState([]);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
//   const [selectedFacility, setSelectedFacility] = useState("");
//   const [date, setDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/facility", {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJiNmVhMGM3MWRlMjZhYThlMzQ3ZWMiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsImlhdCI6MTcyNDk0MzU4NywiZXhwIjoxNzI0OTc5NTg3fQ.Z112hKqZsEvC2DAoghQC-FBdgo3p0D2eHuBrk3_Gn40`,
//           },
//         });
//         console.log("Facilities fetched:", response.data); // Log the response to check the data
//         setFacilities(response.data.data); // Access the 'data' field
//       } catch (error) {
//         console.error("Error fetching facilities:", error);
//       }
//     };

//     fetchFacilities();
//   }, []);

//   useEffect(() => {
//     if (selectedFacility && date) {
//       axios
//         .get(`http://localhost:5000/api/check-availability`, {
//           params: {
//             facility: selectedFacility,
//             date: date,
//           },
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJiNmVhMGM3MWRlMjZhYThlMzQ3ZWMiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsImlhdCI6MTcyNDk0MzU4NywiZXhwIjoxNzI0OTc5NTg3fQ.Z112hKqZsEvC2DAoghQC-FBdgo3p0D2eHuBrk3_Gn40`,
//           },
//         })
//         .then((response) => {
//           const availableSlotsData = response.data.data; // Access the 'data' field inside response
//           setAvailableSlots(availableSlotsData);
//         })
//         .catch((error) => {
//           console.error("Error fetching available slots:", error);
//         });
//     }
//   }, [selectedFacility, date]);

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/bookings",
//         {
//           facility: selectedFacility,
//           date,
//           startTime,
//           endTime,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJiNmVhMGM3MWRlMjZhYThlMzQ3ZWMiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsImlhdCI6MTcyNDk0OTU5OSwiZXhwIjoxNzI0OTg1NTk5fQ.d8tdqUUHrxXPTX8c38HV20LEtr83Vi7pdDglqcvGe7w`,
//           },
//         }
//       );
//       console.log("Booking created successfully:", response.data);
//       setBookingDetails(response.data.data);
//       setIsBookingConfirmed(true);
//     } catch (error) {
//       console.error(
//         "Error creating booking:",
//         error.response ? error.response.data : error.message
//       );
//       alert("Failed to create booking. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       {!isBookingConfirmed ? (
//         <form onSubmit={handleBookingSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="facility"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Facility:
//             </label>
//             <select
//               name="facility"
//               id="facility"
//               value={selectedFacility}
//               onChange={(e) => setSelectedFacility(e.target.value)}
//               className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             >
//               <option value="">Select a facility</option>
//               {facilities.map((facility) => (
//                 <option key={facility._id} value={facility._id}>
//                   {facility.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="date"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Date:
//             </label>
//             <input
//               type="date"
//               name="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="startTime"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Start Time:
//             </label>
//             <input
//               type="time"
//               name="startTime"
//               id="startTime"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="endTime"
//               className="block text-sm font-medium text-gray-700"
//             >
//               End Time:
//             </label>
//             <input
//               type="time"
//               name="endTime"
//               id="endTime"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               Proceed to Pay
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="mt-6">
//           <BookingSummary bookingDetails={bookingDetails} />
//           <div className="flex justify-center mt-4">
//             <PaymentButton
//               amount={bookingDetails.payableAmount}
//               bookingId={bookingDetails._id}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;

import { useState, useEffect } from "react";
// Adjust the import path as necessary
import BookingSummary from "./BookingSummary";
import PaymentButton from "./Facility/PaymentButton";
import { useApi } from "../hooks/useApi";

const BookingForm = () => {
  const [facilities, setFacilities] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { apiCall, loading, error } = useApi();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/facility",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFacilities(response.data.data); // Access the 'data' field
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, [token]);

  useEffect(() => {
    if (selectedFacility && date) {
      const fetchAvailableSlots = async () => {
        try {
          const response = await apiCall({
            method: "GET",
            url: "http://localhost:5000/api/check-availability",
            params: {
              facility: selectedFacility,
              date: date,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAvailableSlots(response.data.data); // Access the 'data' field
        } catch (error) {
          console.error("Error fetching available slots:", error);
        }
      };

      fetchAvailableSlots();
    }
  }, [selectedFacility, date, token]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiCall({
        method: "POST",
        url: "http://localhost:5000/api/bookings",
        data: {
          facility: selectedFacility,
          date,
          startTime,
          endTime,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJiNmVhMGM3MWRlMjZhYThlMzQ3ZWMiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsImlhdCI6MTcyNTEwNjk1NiwiZXhwIjoxNzI1MTQyOTU2fQ.cVILZc93j2lR3sE2NNXgTEqUDYWZyme7fp79YnjgytM`,
        },
      });
      setBookingDetails(response.data.data);
      setIsBookingConfirmed(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {!isBookingConfirmed ? (
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="facility"
              className="block text-sm font-medium text-gray-700"
            >
              Facility:
            </label>
            <select
              name="facility"
              id="facility"
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a facility</option>
              {facilities.map((facility) => (
                <option key={facility._id} value={facility._id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time:
            </label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time:
            </label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Proceed to Pay
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6">
          <BookingSummary bookingDetails={bookingDetails} />
          <div className="flex justify-center mt-4">
            <PaymentButton
              amount={bookingDetails.payableAmount}
              bookingId={bookingDetails._id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
