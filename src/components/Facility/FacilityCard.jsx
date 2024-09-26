/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const FacilityCard = ({ facility }) => {
  console.log(facility);

  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (facility._id) {
      navigate(`/facility/${facility._id}`);
    } else {
      console.error("Facility ID is missing!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={facility.image || "/placeholder-image.jpg"}
        alt={facility.name || "Facility"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{facility.name}</h2>
        <p className="text-gray-700 mb-4">${facility.pricePerHour} per hour</p>
        <button
          onClick={handleViewDetails}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;
