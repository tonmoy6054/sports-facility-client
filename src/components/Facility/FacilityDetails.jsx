import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi"; // Assuming you have a custom hook for API calls

const FacilityDetailPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [facility, setFacility] = useState(null);
  const { apiCall, loading } = useApi();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      console.log("Fetching details for facility ID:", id); // Log ID
      try {
        const response = await apiCall({
          method: "GET",
          url: `http://localhost:5000/api/facility/${id}`,
        });
        console.log("Response received:", response); // Log response

        if (response.success) {
          setFacility(response.data);
        } else {
          console.error("Error fetching facility details:", response);
        }
      } catch (error) {
        console.error("Error fetching facility details:", error);
      }
    };

    fetchFacilityDetails();
  }, [id]);

  const handleBooking = () => {
    // Redirect to booking form with facility and price information
    navigate("/booking-form", {
      state: { facility, price: facility.pricePerHour },
    });
  };

  if (loading) return <p>Loading facility details...</p>;

  if (!facility) return <p>No details found for this facility.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{facility.name}</h1>
      <img
        src={facility.image}
        alt={facility.name}
        className="w-full h-48 object-cover"
      />
      <p className="text-lg">Price per hour: ${facility.pricePerHour}</p>
      <p>{facility.description}</p> {/* Display any additional details */}
      {/* Book Now Button */}
      <button
        onClick={handleBooking}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Book Now
      </button>
    </div>
  );
};

export default FacilityDetailPage;
