// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import axios from "axios";

// const AvailabilityCheck = ({ facilityId }) => {
//   const [date, setDate] = useState("");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const checkAvailability = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/check-availability",
//         {
//           params: { date, facility: facilityId },
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmJiNmVhMGM3MWRlMjZhYThlMzQ3ZWMiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsImlhdCI6MTcyNDk0MzU4NywiZXhwIjoxNzI0OTc5NTg3fQ.Z112hKqZsEvC2DAoghQC-FBdgo3p0D2eHuBrk3_Gn40`,
//           },
//         }
//       );
//       setAvailableSlots(response.data.data);
//     } catch (error) {
//       console.error("Error checking availability:", error);
//     }
//   };
//   return (
//     <div>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <button onClick={checkAvailability}>Check Availability</button>

//       {availableSlots.length > 0 ? (
//         <ul>
//           {availableSlots.map((slot, index) => (
//             <li key={index}>
//               {slot.startTime} - {slot.endTime}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No available slots for this date and facility.</p>
//       )}
//     </div>
//   );
// };

// export default AvailabilityCheck;

import { useContext, useState } from "react";
import { useApi } from "../../hooks/useApi";
import AuthContext from "../../context/AuthContext";
// Adjust the path to where your custom hook is located

const AvailabilityCheck = ({ facilityId }) => {
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const { apiCall, loading } = useApi(); // Destructure loading state from the custom hook
  const { token } = useContext(AuthContext);
  const checkAvailability = async () => {
    try {
      const response = await apiCall({
        method: "GET",
        url: "http://localhost:5000/api/check-availability",
        params: { date, facility: facilityId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableSlots(response.data.data);
    } catch (error) {
      console.error("Error checking availability:", error);
    }
  };

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={checkAvailability} disabled={loading}>
        {loading ? "Checking..." : "Check Availability"}
      </button>

      {availableSlots.length > 0 ? (
        <ul>
          {availableSlots.map((slot, index) => (
            <li key={index}>
              {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      ) : (
        <p>No available slots for this date and facility.</p>
      )}
    </div>
  );
};

export default AvailabilityCheck;
