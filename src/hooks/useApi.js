// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Custom Hook for API Calls
// export const useApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const apiCall = async (config) => {
//     setLoading(true);
//     try {
//       const response = await axios(config);
//       setLoading(false);
//       return response.data;
//     } catch (error) {
//       setLoading(false);
//       handleError(error);
//       setError(error);
//       throw error; // Rethrow if you want to handle it further up
//     }
//   };

//   const handleError = (error) => {
//     if (error.response) {
//       toast.error(
//         `Error: ${error.response.data.message || "Something went wrong!"}`
//       );
//     } else if (error.request) {
//       toast.error("Error: No response from server. Please try again later.");
//     } else {
//       toast.error(`Error: ${error.message}`);
//     }
//   };

//   return { apiCall, loading, error };
// };

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(config);
      setLoading(false);
      // return response.data;
      return response;
    } catch (err) {
      setLoading(false);
      setError(err);
      handleError(err);
      throw err;
    }
  };

  const handleError = (error) => {
    if (error.response) {
      toast.error(
        `Error: ${error.response.data.message || "Something went wrong!"}`
      );
    } else if (error.request) {
      toast.error("Error: No response from server. Please try again later.");
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };

  return { apiCall, loading, error };
};
