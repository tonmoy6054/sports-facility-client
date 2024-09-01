import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

const AdminFacilityManagement = () => {
  const { apiCall, loading } = useApi();
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState({
    name: "",
    description: "",
    image: "",
    pricePerHour: "",
    location: "",
  });

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/facility",
        });
        setFacilities(response.data.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

  const handleAddFacility = async () => {
    try {
      if (!newFacility.name || !newFacility.description || !newFacility.image) {
        console.error("All fields are required");
        return;
      }

      await apiCall({
        method: "POST",
        url: "http://localhost:5000/api/facility",
        data: newFacility,
      });
      console.log("Facility added successfully");

      // Refresh the facility list
      const refreshResponse = await apiCall({
        method: "GET",
        url: "http://localhost:5000/api/facility",
      });
      setFacilities(refreshResponse.data.data);
    } catch (error) {
      console.error(
        "Error adding facility:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Facility Management</h2>
      {loading ? (
        <p>Loading facilities...</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newFacility.name}
            onChange={(e) =>
              setNewFacility({ ...newFacility, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newFacility.description}
            onChange={(e) =>
              setNewFacility({ ...newFacility, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newFacility.image}
            onChange={(e) =>
              setNewFacility({ ...newFacility, image: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Price per Hour"
            value={newFacility.pricePerHour}
            onChange={(e) =>
              setNewFacility({ ...newFacility, pricePerHour: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={newFacility.location}
            onChange={(e) =>
              setNewFacility({ ...newFacility, location: e.target.value })
            }
          />
          <button onClick={handleAddFacility}>Add Facility</button>
        </div>
      )}
      <ul>
        {facilities.map((facility) => (
          <li key={facility._id}>
            <h3>{facility.name}</h3>
            <p>{facility.description}</p>
            <img src={facility.image} alt={facility.name} />
            {/* Add edit and delete functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFacilityManagement;
