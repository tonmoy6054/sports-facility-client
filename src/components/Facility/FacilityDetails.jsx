// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const FacilityDetailsPage = () => {
//   const { id } = useParams();
//   console.log(id); // Extract the facility ID from the URL
//   const navigate = useNavigate(); // For navigating to the booking page
//   const [facility, setFacility] = useState(null);

//   useEffect(() => {
//     const fetchFacilityDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/facility/${id}`
//         );
//         setFacility(response.data.data); // Assuming your API response structure
//       } catch (error) {
//         console.error("Error fetching facility details:", error);
//       }
//     };
//     fetchFacilityDetails();
//   }, [id]);

//   if (!facility) {
//     return <p>Loading...</p>; // Show a loading state while fetching data
//   }

//   const handleBookNow = () => {
//     navigate(`/facility/${id}/book`); // Navigate to the booking page
//   };

//   return (
//     <div className="container mx-auto my-10 px-4">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <img
//           src={facility.image}
//           alt={facility.name}
//           className="w-64 h-64 object-cover"
//         />
//         <div className="p-4">
//           <h1 className="text-3xl font-bold mb-4">{facility.name}</h1>
//           <p className="text-gray-700 text-lg mb-4">{facility.location}</p>
//           <p className="text-gray-700 text-lg mb-4">
//             ${facility.pricePerHour} per hour
//           </p>
//           <p className="text-gray-700 text-lg mb-4">{facility.description}</p>
//           <button
//             onClick={handleBookNow}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacilityDetailsPage;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

const FacilityDetailsPage = () => {
  const { id } = useParams();
  URL;
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const { apiCall, loading } = useApi(); // Destructure apiCall and loading from the custom hook

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: `http://localhost:5000/api/facility/${id}`,
        });
        setFacility(response.data.data); // Assuming your API response structure
      } catch (error) {
        console.error("Error fetching facility details:", error);
      }
    };

    fetchFacilityDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  if (!facility) {
    return <p>No facility details found.</p>; // Handle case when no facility data is available
  }

  const handleBookNow = () => {
    navigate(`/facility/${id}/book`); // Navigate to the booking page
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="w-64 h-64 object-cover"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{facility.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{facility.location}</p>
          <p className="text-gray-700 text-lg mb-4">
            ${facility.pricePerHour} per hour
          </p>
          <p className="text-gray-700 text-lg mb-4">{facility.description}</p>
          <button
            onClick={handleBookNow}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
