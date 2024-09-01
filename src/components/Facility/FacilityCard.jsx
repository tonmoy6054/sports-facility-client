/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const FacilityCard = ({ facility }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/facility/${facility._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={facility.image}
        alt={facility.name}
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
