import { useState, useEffect } from "react";
import SearchAndFilters from "../SearchAndFilters";
import FacilityCard from "./FacilityCard";
import { useApi } from "../../hooks/useApi";

const FacilityListingPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const { apiCall, loading } = useApi();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        console.log("Fetching facilities..."); // Log fetching
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/facilities",
        });

        console.log("Facilities response:", response); // Log response

        // Access the data property from the response
        if (response && response.success && Array.isArray(response.data)) {
          const availableFacilities = response.data.filter(
            (facility) => !facility.isDeleted
          );

          setFacilities(availableFacilities);
          setFilteredFacilities(availableFacilities);
        } else {
          console.error("Unexpected response structure:", response);
          setFacilities([]);
          setFilteredFacilities([]);
        }
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []); // Empty dependency array to prevent infinite loop

  useEffect(() => {
    const filterFacilities = () => {
      const filtered = facilities.filter(
        (facility) =>
          facility.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          facility.pricePerHour >= priceRange[0] &&
          facility.pricePerHour <= priceRange[1]
      );
      setFilteredFacilities(filtered);
      setCurrentPage(1);
    };
    filterFacilities();
  }, [searchTerm, priceRange, facilities]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFacilities = filteredFacilities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Available Facilities
      </h1>
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      {loading ? (
        <p>Loading facilities...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFacilities.length > 0 ? (
              currentFacilities.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
              ))
            ) : (
              <p className="text-center">No facilities available.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FacilityListingPage;
