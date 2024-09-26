import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import AuthContext from "../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { apiCall, loading } = useApi();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Attempting to log in..."); // Debug statement
      const response = await apiCall({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: "http://localhost:5000/api/auth/login",
        data: {
          email,
          password,
        },
      });

      const data = response; // You don't need to do response.json() when using axios

      if (data.success) {
        // Store the token in localStorage
        console.log("Received token:", data.token); // Add a debug statement
        localStorage.setItem("authToken", data.token);

        login(data.token); // Update your AuthContext with the token
        navigate("/dashboard"); // Redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error); // Debug statement
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded"
    >
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
