// import { useContext, useEffect, useState } from "react";
// import { useApi } from "../../hooks/useApi";
// import AuthContext from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const EditProfile = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const { apiCall, loading, error } = useApi();
//   const { token } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await apiCall({
//           method: "GET",
//           url: "http://localhost:5000/api/user-info",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const userData = response.data.data;
//         setFormData({
//           name: userData.name,
//           email: userData.email,
//           phone: userData.phone,
//           address: userData.address,
//         });
//       } catch (err) {
//         console.error("Error fetching user profile", err);
//       }
//     };

//     fetchUserProfile();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await apiCall({
//         method: "PUT",
//         url: "http://localhost:5000/api/user-info",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: formData,
//       });

//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Error updating profile", err);
//     }
//   };

//   if (loading) return <div className="container mx-auto p-6">Loading...</div>;
//   if (error)
//     return (
//       <div className="container mx-auto p-6">
//         Error: Unable to load user data. Please try again later.
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto"
//       >
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

//         <div className="mb-4">
//           <label
//             htmlFor="name"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="phone"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Phone
//           </label>
//           <input
//             type="text"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="address"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Address
//           </label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit" // Only submit event
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;

import { useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { apiCall, loading, error } = useApi();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiCall({
          method: "GET",
          url: "http://localhost:5000/api/user-info",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;

        // Log the response to verify that the data is correct
        console.log("User Data Fetched:", userData);

        // Update the form data with the fetched user data
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };

    fetchUserProfile();
  }, [token]); // Make sure to include apiCall in dependencies

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiCall({
        method: "PUT",
        url: "http://localhost:5000/api/user-info",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  if (loading) return <div className="container mx-auto p-6">Loading...</div>;
  if (error)
    return (
      <div className="container mx-auto p-6">
        Error: Unable to load user data. Please try again later.
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name} // Controlled input
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email} // Controlled input
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone} // Controlled input
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address} // Controlled input
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
