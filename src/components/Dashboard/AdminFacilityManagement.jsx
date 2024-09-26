// import { useState, useEffect, useContext } from "react";
// import { useApi } from "../../hooks/useApi";
// import AuthContext from "../../context/AuthContext";

// const AdminFacilityManagement = () => {
//   const { apiCall } = useApi();
//   const { token } = useContext(AuthContext);
//   const [facilities, setFacilities] = useState([]);
//   const [newFacility, setNewFacility] = useState({
//     name: "",
//     description: "",
//     image: "",
//     pricePerHour: "",
//     location: "",
//   });
//   const [editingFacilityId, setEditingFacilityId] = useState(null);

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const response = await apiCall({
//           method: "GET",
//           url: "http://localhost:5000/api/facilities",
//         });
//         setFacilities(response.data);
//       } catch (error) {
//         console.error("Error fetching facilities:", error);
//       }
//     };

//     fetchFacilities();
//   }, []);

//   const handleAddFacility = async () => {
//     try {
//       const { name, description, image, pricePerHour, location } = newFacility;

//       if (!name || !description || !image || !pricePerHour) {
//         console.error("All fields are required");
//         return;
//       }

//       const facilityData = {
//         name,
//         description,
//         image,
//         pricePerHour: parseFloat(pricePerHour),
//         location,
//       };

//       if (editingFacilityId) {
//         await apiCall({
//           method: "PUT",
//           url: `http://localhost:5000/api/facility/${editingFacilityId}`,
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: facilityData,
//         });
//         console.log("Facility updated successfully");
//       } else {
//         await apiCall({
//           method: "POST",
//           url: "http://localhost:5000/api/facilities",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: facilityData,
//         });
//         console.log("Facility added successfully");
//       }

//       // Refresh the facility list
//       const refreshResponse = await apiCall({
//         method: "GET",
//         url: "http://localhost:5000/api/facilities",
//       });
//       setFacilities(refreshResponse.data.data);
//       setNewFacility({
//         name: "",
//         description: "",
//         image: "",
//         pricePerHour: "",
//         location: "",
//       });
//       setEditingFacilityId(null);
//     } catch (error) {
//       console.error(
//         "Error adding/updating facility:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const handleEditFacility = (facility) => {
//     setNewFacility({
//       name: facility.name,
//       description: facility.description,
//       image: facility.image,
//       pricePerHour: facility.pricePerHour.toString(),
//       location: facility.location,
//     });
//     setEditingFacilityId(facility._id);

//     console.log("New facility state:", {
//       name: facility.name,
//       description: facility.description,
//       image: facility.image,
//       pricePerHour: facility.pricePerHour.toString(),
//       location: facility.location,
//     });
//   };

//   const handleDeleteFacility = async (facilityId) => {
//     try {
//       await apiCall({
//         method: "DELETE",
//         url: `http://localhost:5000/api/facility/${facilityId}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Facility deleted successfully");

//       // Refresh the facility list
//       const refreshResponse = await apiCall({
//         method: "GET",
//         url: "http://localhost:5000/api/facilities",
//       });
//       setFacilities(refreshResponse.data);
//     } catch (error) {
//       console.error(
//         "Error deleting facility:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//         Facility Management
//       </h2>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <div className="flex flex-wrap mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newFacility.name}
//             onChange={(e) =>
//               setNewFacility({ ...newFacility, name: e.target.value })
//             }
//             className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full md:w-1/4"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newFacility.description}
//             onChange={(e) =>
//               setNewFacility({ ...newFacility, description: e.target.value })
//             }
//             className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full md:w-1/4"
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={newFacility.image}
//             onChange={(e) =>
//               setNewFacility({ ...newFacility, image: e.target.value })
//             }
//             className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full md:w-1/4"
//           />
//           <input
//             type="text"
//             placeholder="Price per Hour"
//             value={newFacility.pricePerHour}
//             onChange={(e) =>
//               setNewFacility({ ...newFacility, pricePerHour: e.target.value })
//             }
//             className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full md:w-1/4"
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={newFacility.location}
//             onChange={(e) =>
//               setNewFacility({ ...newFacility, location: e.target.value })
//             }
//             className="p-2 border border-gray-300 rounded-md w-full md:w-1/4"
//           />
//         </div>
//         <div className="flex items-center">
//           <button
//             onClick={handleAddFacility}
//             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
//           >
//             {editingFacilityId ? "Update Facility" : "Add Facility"}
//           </button>
//           {editingFacilityId && (
//             <button
//               onClick={() => {
//                 setEditingFacilityId(null);
//                 setNewFacility({
//                   name: "",
//                   description: "",
//                   image: "",
//                   pricePerHour: "",
//                   location: "",
//                 });
//               }}
//               className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>
//       <ul className="space-y-6">
//         {Array.isArray(facilities) && facilities.length > 0 ? (
//           facilities.map((facility) => (
//             <li
//               key={facility._id}
//               className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between"
//             >
//               <div className="flex items-center mb-4 md:mb-0">
//                 <img
//                   src={facility.image}
//                   alt={facility.name}
//                   className="w-32 h-32 object-cover rounded-md mr-6"
//                 />
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {facility.name}
//                   </h3>
//                   <p className="text-gray-600 mb-2">{facility.description}</p>
//                   <p className="text-gray-800 font-medium">
//                     Price per Hour: ${facility.pricePerHour}
//                   </p>
//                   <p className="text-gray-800 font-medium">
//                     Location: {facility.location}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <button
//                   onClick={() => handleEditFacility(facility)}
//                   className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteFacility(facility._id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p>No facilities available.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default AdminFacilityManagement;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useApi } from "../../hooks/useApi";
import AuthContext from "../../context/AuthContext";

const AdminFacilityManagement = () => {
  const { apiCall } = useApi();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate(); // Create the navigate function
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState({
    name: "",
    description: "",
    image: "",
    pricePerHour: "",
    location: "",
  });
  const [editingFacilityId, setEditingFacilityId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/facilities",
        });
        setFacilities(response.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

  const handleAddFacility = async () => {
    try {
      const { name, description, image, pricePerHour, location } = newFacility;

      if (!name || !description || !image || !pricePerHour) {
        console.error("All fields are required");
        return;
      }

      const facilityData = {
        name,
        description,
        image,
        pricePerHour: parseFloat(pricePerHour),
        location,
      };

      if (editingFacilityId) {
        await apiCall({
          method: "PUT",
          url: `http://localhost:5000/api/facility/${editingFacilityId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: facilityData,
        });
        console.log("Facility updated successfully");

        // Redirect to dashboard after successful update
        navigate("/dashboard");
      } else {
        await apiCall({
          method: "POST",
          url: "http://localhost:5000/api/facilities",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: facilityData,
        });
        console.log("Facility added successfully");
      }

      // Refresh the facility list
      const refreshResponse = await apiCall({
        method: "GET",
        url: "http://localhost:5000/api/facilities",
      });
      setFacilities(refreshResponse.data.data);
      setNewFacility({
        name: "",
        description: "",
        image: "",
        pricePerHour: "",
        location: "",
      });
      setEditingFacilityId(null);
      setIsModalOpen(false); // Close modal after success
    } catch (error) {
      console.error(
        "Error adding/updating facility:",
        error.response?.data || error.message
      );
    }
  };

  const handleEditFacility = (facility) => {
    setNewFacility({
      name: facility.name,
      description: facility.description,
      image: facility.image,
      pricePerHour: facility.pricePerHour.toString(),
      location: facility.location,
    });
    setEditingFacilityId(facility._id);
    setIsModalOpen(true); // Open modal for editing
  };

  const handleDeleteFacility = async (facilityId) => {
    try {
      await apiCall({
        method: "DELETE",
        url: `http://localhost:5000/api/facility/${facilityId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Facility deleted successfully");

      // Refresh the facility list
      const refreshResponse = await apiCall({
        method: "GET",
        url: "http://localhost:5000/api/facilities",
      });
      setFacilities(refreshResponse.data);
    } catch (error) {
      console.error(
        "Error deleting facility:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Facility Management
      </h2>

      {/* Add Facility Button */}
      <button
        onClick={() => {
          setNewFacility({
            name: "",
            description: "",
            image: "",
            pricePerHour: "",
            location: "",
          }); // Clear the form
          setEditingFacilityId(null); // Ensure no editing facility ID is set
          setIsModalOpen(true); // Open the modal
        }}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4"
      >
        Add Facility
      </button>

      {/* Facility Modal */}
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">
              {editingFacilityId ? "Edit Facility" : "Add Facility"}
            </h3>
            <div className="flex flex-wrap mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newFacility.name}
                onChange={(e) =>
                  setNewFacility({ ...newFacility, name: e.target.value })
                }
                className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Description"
                value={newFacility.description}
                onChange={(e) =>
                  setNewFacility({
                    ...newFacility,
                    description: e.target.value,
                  })
                }
                className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newFacility.image}
                onChange={(e) =>
                  setNewFacility({ ...newFacility, image: e.target.value })
                }
                className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Price per Hour"
                value={newFacility.pricePerHour}
                onChange={(e) =>
                  setNewFacility({
                    ...newFacility,
                    pricePerHour: e.target.value,
                  })
                }
                className="mr-2 mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Location"
                value={newFacility.location}
                onChange={(e) =>
                  setNewFacility({ ...newFacility, location: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex items-center">
              <button
                onClick={handleAddFacility}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
              >
                {editingFacilityId ? "Update Facility" : "Add Facility"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Facility List */}
      <ul className="space-y-6">
        {Array.isArray(facilities) && facilities.length > 0 ? (
          facilities.map((facility) => (
            <li
              key={facility._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-32 h-32 object-cover rounded-md mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{facility.description}</p>
                  <p className="text-gray-800 font-medium">
                    Price per Hour: ${facility.pricePerHour}
                  </p>
                  <p className="text-gray-800 font-medium">
                    Location: {facility.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleEditFacility(facility)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFacility(facility._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No facilities available</li>
        )}
      </ul>
    </div>
  );
};

export default AdminFacilityManagement;
