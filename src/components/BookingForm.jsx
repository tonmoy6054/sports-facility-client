// import { useState, useEffect } from "react";
// import axios from "axios";

// const BookingForm = () => {
//   const [date, setDate] = useState("");
//   const [facilityId, setFacilityId] = useState("");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [facilityDetails, setFacilityDetails] = useState(null);
//   const [facilities, setFacilities] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [bookingAmount, setBookingAmount] = useState(0);
//   const [email, setEmail] = useState(""); // State for user email
//   const [phone, setPhone] = useState(""); // State for user phone number

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/facilities"
//         );
//         if (response.data.success) {
//           setFacilities(response.data.data);
//         } else {
//           setErrorMessage("No facilities available.");
//         }
//       } catch (error) {
//         setErrorMessage("Error fetching facilities.");
//       }
//     };
//     fetchFacilities();
//   }, []);

//   const checkAvailability = async () => {
//     if (!date || !facilityId) {
//       setErrorMessage("Please select a date and facility.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/check-availability?date=${date}&facility=${facilityId}`
//       );

//       if (response.data.success) {
//         setAvailableSlots(response.data.availableSlots);
//         setFacilityDetails(response.data.facilityDetails);
//         setBookingAmount(response.data.facilityDetails.pricePerHour);
//         setErrorMessage("");
//       } else {
//         setErrorMessage(response.data.message);
//       }
//     } catch (error) {
//       setErrorMessage("Error fetching availability.");
//     }
//   };

//   const handleBooking = async (startTime, endTime) => {
//     const durationInHours = (end - start) / (1000 * 60 * 60); // convert milliseconds to hours

//     // Calculate the total amount
//     const totalAmount = durationInHours * bookingAmount;
//     const bookingDetails = {
//       date,
//       startTime,
//       endTime,
//       facilityId,
//       amount: totalAmount,
//       email, // Use dynamic email
//       phone, // Use dynamic phone number
//     };

//     try {
//       const paymentResponse = await axios.post(
//         "http://localhost:5000/api/payment/init-payment",
//         bookingDetails
//       );

//       if (paymentResponse.data.success) {
//         window.location.href = paymentResponse.data.payment_url;
//       } else {
//         setErrorMessage("Payment initiation failed. Try again.");
//       }
//     } catch (error) {
//       setErrorMessage("Error initiating payment.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h1 className="text-3xl font-bold text-center mb-6">Booking Page</h1>

//       <div className="mb-4">
//         <label htmlFor="date" className="block text-lg font-medium mb-2">
//           Select Date:
//         </label>
//         <input
//           id="date"
//           type="date"
//           className="w-full px-3 py-2 border rounded-md shadow-sm"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="facility" className="block text-lg font-medium mb-2">
//           Select Facility:
//         </label>
//         <select
//           id="facility"
//           className="w-full px-3 py-2 border rounded-md shadow-sm"
//           value={facilityId}
//           onChange={(e) => setFacilityId(e.target.value)}
//         >
//           <option value="">Select Facility</option>
//           {facilities.map((facility) => (
//             <option key={facility._id} value={facility._id}>
//               {facility.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label htmlFor="email" className="block text-lg font-medium mb-2">
//           Email:
//         </label>
//         <input
//           id="email"
//           type="email"
//           className="w-full px-3 py-2 border rounded-md shadow-sm"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="phone" className="block text-lg font-medium mb-2">
//           Phone:
//         </label>
//         <input
//           id="phone"
//           type="tel"
//           className="w-full px-3 py-2 border rounded-md shadow-sm"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           placeholder="Enter your phone number"
//         />
//       </div>

//       <button
//         onClick={checkAvailability}
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//       >
//         Check Availability
//       </button>

//       {errorMessage && (
//         <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
//       )}

//       {facilityDetails && (
//         <div className="mt-6 p-4 border rounded-md bg-gray-50">
//           <h2 className="text-xl font-bold">{facilityDetails.name}</h2>
//           <p className="text-gray-700">{facilityDetails.description}</p>
//         </div>
//       )}

//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-4">Available Time Slots:</h3>
//         {availableSlots.length > 0 ? (
//           <ul className="space-y-2">
//             {availableSlots.map((slot, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
//               >
//                 <span>
//                   {slot.startTime} - {slot.endTime}
//                 </span>
//                 <button
//                   onClick={() => handleBooking(slot.startTime, slot.endTime)}
//                   className="bg-green-500 text-white py-1 px-3 rounded-md"
//                 >
//                   Book
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No available slots.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

import { useState, useEffect } from "react";
import axios from "axios";

const BookingForm = () => {
  const [date, setDate] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [facilityDetails, setFacilityDetails] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingAmount, setBookingAmount] = useState(0);
  const [email, setEmail] = useState(""); // State for user email
  const [phone, setPhone] = useState(""); // State for user phone number
  const pricePerHour = 100;
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/facilities"
        );
        if (response.data.success) {
          setFacilities(response.data.data);
        } else {
          setErrorMessage("No facilities available.");
        }
      } catch (error) {
        setErrorMessage("Error fetching facilities.");
      }
    };
    fetchFacilities();
  }, []);

  const checkAvailability = async () => {
    if (!date || !facilityId) {
      setErrorMessage("Please select a date and facility.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/check-availability?date=${date}&facility=${facilityId}`
      );

      if (response.data.success) {
        setAvailableSlots(response.data.availableSlots);
        setFacilityDetails(response.data.facilityDetails);
        setBookingAmount(response.data.facilityDetails.pricePerHour);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Error fetching availability.");
    }
  };

  const handleBooking = async (startTime, endTime) => {
    const start = new Date(`${date}T${startTime}`); // Convert to Date object
    const end = new Date(`${date}T${endTime}`); // Convert to Date object
    const durationInHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours

    // Calculate the total amount
    const totalAmount = durationInHours * pricePerHour;
    console.log("Total Amount:", totalAmount);

    const bookingDetails = {
      date,
      startTime,
      endTime,
      facilityId,
      amount: totalAmount,
      email, // Use dynamic email
      phone, // Use dynamic phone number
    };

    try {
      const paymentResponse = await axios.post(
        "http://localhost:5000/api/payment/init-payment",
        bookingDetails
      );

      if (paymentResponse.data.success) {
        window.location.href = paymentResponse.data.payment_url;
      } else {
        setErrorMessage("Payment initiation failed. Try again.");
      }
    } catch (error) {
      setErrorMessage("Error initiating payment.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Booking Page</h1>

      <div className="mb-4">
        <label htmlFor="date" className="block text-lg font-medium mb-2">
          Select Date:
        </label>
        <input
          id="date"
          type="date"
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="facility" className="block text-lg font-medium mb-2">
          Select Facility:
        </label>
        <select
          id="facility"
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          value={facilityId}
          onChange={(e) => setFacilityId(e.target.value)}
        >
          <option value="">Select Facility</option>
          {facilities.map((facility) => (
            <option key={facility._id} value={facility._id}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          Email:
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-lg font-medium mb-2">
          Phone:
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <button
        onClick={checkAvailability}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Check Availability
      </button>

      {errorMessage && (
        <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
      )}

      {facilityDetails && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h2 className="text-xl font-bold">{facilityDetails.name}</h2>
          <p className="text-gray-700">{facilityDetails.description}</p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Available Time Slots:</h3>
        {availableSlots.length > 0 ? (
          <ul className="space-y-2">
            {availableSlots.map((slot, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
              >
                <span>
                  {slot.startTime} - {slot.endTime}
                </span>
                <button
                  onClick={() => handleBooking(slot.startTime, slot.endTime)}
                  className="bg-green-500 text-white py-1 px-3 rounded-md"
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No available slots.</p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
