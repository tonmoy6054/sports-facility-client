// import { useState } from "react";
// import axios from "axios";

// const AddAdmin = () => {
//   const [admin, setAdmin] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     address: "",
//   });

//   const handleAddAdmin = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/admins", admin, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Admin added successfully");
//     } catch (error) {
//       console.error("Error adding admin:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Admin</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={admin.name}
//         onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={admin.email}
//         onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={admin.password}
//         onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={admin.phoneNumber}
//         onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Address"
//         value={admin.address}
//         onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
//       />
//       <button onClick={handleAddAdmin}>Add Admin</button>
//     </div>
//   );
// };

// export default AddAdmin;

import { useContext, useState } from "react";
import { useApi } from "../../hooks/useApi";
import AuthContext from "../../context/AuthContext";

const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const { token } = useContext(AuthContext);
  const { apiCall, loading } = useApi(); // Destructure apiCall and loading from the custom hook

  const handleAddAdmin = async () => {
    try {
      await apiCall({
        method: "POST",
        url: "http://localhost:5000/api/admins",
        data: admin,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Admin added successfully");
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin");
    }
  };

  return (
    <div>
      <h2>Add Admin</h2>
      <input
        type="text"
        placeholder="Name"
        value={admin.name}
        onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={admin.email}
        onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={admin.password}
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={admin.phoneNumber}
        onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={admin.address}
        onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
      />
      <button onClick={handleAddAdmin} disabled={loading}>
        {loading ? "Adding Admin..." : "Add Admin"}
      </button>
    </div>
  );
};

export default AddAdmin;
