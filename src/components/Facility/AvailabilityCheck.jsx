import { useContext, useState } from "react";
import { useApi } from "../../hooks/useApi";
import AuthContext from "../../context/AuthContext";

const AvailabilityCheck = ({ facilityId }) => {
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const { apiCall, loading } = useApi();
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
