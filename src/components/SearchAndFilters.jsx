/* eslint-disable react/prop-types */
const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = [...priceRange];
    if (name === "minPrice") {
      newPriceRange[0] = Number(value);
    } else {
      newPriceRange[1] = Number(value);
    }
    setPriceRange(newPriceRange);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="mb-4 md:mb-0">
        <input
          type="text"
          placeholder="Search by facility name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2">Price Range:</label>
        <input
          type="number"
          name="minPrice"
          value={priceRange[0]}
          onChange={handlePriceChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <span className="mx-2">-</span>
        <input
          type="number"
          name="maxPrice"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default SearchAndFilters;
