import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Custom Hook for API Calls
const BASE_URL = "http://localhost:5000"; // Backend API URL

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (config) => {
    setLoading(true);
    setError(null);

    try {
      const authToken = localStorage.getItem("authToken");

      // Attach Authorization header if token exists
      if (authToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${authToken}`,
        };
      }

      // Ensure URL is correctly constructed
      const fullUrl = config.url.startsWith("http")
        ? config.url
        : `${BASE_URL}${
            config.url.startsWith("/") ? config.url : "/" + config.url
          }`;
      console.log("Full Request URL:", fullUrl);

      const response = await axios({
        ...config,
        url: fullUrl,
      });

      // Log the response for debugging purposes
      console.log("API Response:", response);

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);

      // Improved error logging for debugging
      if (err.response) {
        // Server responded with a status code other than 2xx
        console.error("Error Response Data:", err.response.data);
        console.error("Error Status Code:", err.response.status);
        console.error("Error Headers:", err.response.headers);

        toast.error(
          `Error: ${
            err.response.data.message ||
            "Request failed with status code " + err.response.status
          }`
        );
      } else if (err.request) {
        // Request was made but no response received
        console.error("No Response Received:", err.request);
        toast.error("Error: No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request
        console.error("Request Setup Error:", err.message);
        toast.error(`Error: ${err.message}`);
      }

      throw err; // Rethrow to handle in the calling component if needed
    }
  };

  return { apiCall, loading, error };
};
