// import { useEffect, useState } from "react";
// import axios from "axios";

// const Facilities = () => {
//   const [facilities, setFacilities] = useState([]);

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/facility");
//         setFacilities(response.data.data);
//       } catch (error) {
//         console.error("Error fetching facilities:", error);
//       }
//     };

//     fetchFacilities();
//   }, []);

//   return (
//     <div className="container mx-auto py-12">
//       <h2 className="text-3xl font-bold mb-8 text-center">
//         Featured Facilities
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {facilities.map((facility) => (
//           <div
//             key={facility._id}
//             className="bg-white shadow-lg rounded-lg overflow-hidden"
//           >
//             <img
//               src={facility.image}
//               alt={facility.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-6">
//               <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
//               <p className="text-gray-700 mb-4">{facility.description}</p>
//               <p className="text-gray-900 font-bold">
//                 ${facility.pricePerHour} per hour
//               </p>
//               <p className="text-gray-600">{facility.location}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Facilities;

// import { useEffect, useState } from "react";
// import { useApi } from "../hooks/useApi";
// // Adjust the import path as necessary

// const Facilities = () => {
//   const [facilities, setFacilities] = useState([]);
//   const { apiCall, loading, error } = useApi();

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const response = await apiCall({
//           method: "GET",
//           url: "http://localhost:5000/api/facility",
//         });
//         setFacilities(response.data.data);
//       } catch (error) {
//         console.error("Error fetching facilities:", error);
//       }
//     };

//     fetchFacilities();
//   }, [apiCall]);

//   if (loading) return <div className="container mx-auto py-12">Loading...</div>;
//   if (error)
//     return (
//       <div className="container mx-auto py-12">Error: {error.message}</div>
//     );

//   return (
//     <div className="container mx-auto py-12">
//       <h2 className="text-3xl font-bold mb-8 text-center">
//         Featured Facilities
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {facilities.map((facility) => (
//           <div
//             key={facility._id}
//             className="bg-white shadow-lg rounded-lg overflow-hidden"
//           >
//             <img
//               src={facility.image}
//               alt={facility.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-6">
//               <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
//               <p className="text-gray-700 mb-4">{facility.description}</p>
//               <p className="text-gray-900 font-bold">
//                 ${facility.pricePerHour} per hour
//               </p>
//               <p className="text-gray-600">{facility.location}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Facilities;

import { useEffect, useState, useRef } from "react";
import { useApi } from "../hooks/useApi";

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const { apiCall, loading, error } = useApi();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/facilities",
        });

        console.log("Fetched facilities response:", response); // Check the structure here

        if (response && Array.isArray(response.data)) {
          setFacilities((prevFacilities) => {
            if (
              JSON.stringify(prevFacilities) !== JSON.stringify(response.data)
            ) {
              return response.data;
            }
            return prevFacilities;
          });
        } else {
          console.error("Unexpected response structure:", response);
          setFacilities([]);
        }
      } catch (err) {
        console.error("Error fetching facilities:", err);
        setFacilities([]);
      } finally {
        isInitialLoad.current = false;
      }
    };

    fetchFacilities();
  }, []);

  if (loading && isInitialLoad.current)
    return <div className="container mx-auto py-12">Loading...</div>;

  if (error)
    return (
      <div className="container mx-auto py-12">Error: {error.message}</div>
    );

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Featured Facilities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                <p className="text-gray-700 mb-4">{facility.description}</p>
                <p className="text-gray-900 font-bold">
                  ${facility.pricePerHour} per hour
                </p>
                <p className="text-gray-600">{facility.location}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No facilities available.</p>
        )}
      </div>
    </div>
  );
};

export default Facilities;
