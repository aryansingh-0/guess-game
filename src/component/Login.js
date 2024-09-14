import axios from "axios"; // Import axios for making API requests
import React, { useState } from "react"; // Import React and useState for managing component state
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation between routes and useNavigate for programmatic redirection

function LoginForm() {
  // Define initial form data using useState hook
  const [formData, setFormData] = useState({
    username: "", // Initialize username as an empty string
    password: "", // Initialize password as an empty string
  });

  const navigate = useNavigate(); // Initialize useNavigate to redirect the user after login

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input field
    setFormData((prevData) => ({
      // Update formData with the new input values
      ...prevData,
      [name]: value, // Dynamically update the name and value in formData
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Make POST request to the backend API for login
      const response = await axios.post(
        "https://game-server-sb04.onrender.com/api/auth/login",
        formData, // Send the form data (username and password) in the request body
        {
          headers: {
            "Content-Type": "application/json", // Set the request header for JSON content
          },
        }
      );

      // Store user credentials in localStorage (you might want to change this to a more secure method)
      localStorage.setItem("username", formData.username);
      localStorage.setItem("password", formData.password);

      console.log(response.data.message); // Log the response for debugging

      // If login is successful, store the user's name and score, then redirect
      if (response.data.message === "Login successful") {
        localStorage.setItem("user", response.data.gamername); // Store the gamer name in localStorage
        localStorage.setItem("score", response.data.score); // Store the score in localStorage
        localStorage.setItem("login", true); // Set a login flag in localStorage

        // Redirect the user to the homepage after a brief delay
        setTimeout(() => {
          navigate("/"); // Navigate to the home route after successful login
        }, 1000); // 1-second delay before redirection
      }
    } catch (error) {
      console.error("Error logging in:", error); // Log any error that occurs during login
    }
  };

  return (
    // Center the form on the screen
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-500">
      <div className=" bg-orange-100 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-[2.5vmax] font-mono font-semibold mb-6 text-center">
          Login
        </h2>

        {/* Form for user login */}
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username} // Bind the username state to the input field
              onChange={handleChange} // Call handleChange on input change
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Password input field */}
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password} // Bind the password state to the input field
              onChange={handleChange} // Call handleChange on input change
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        {/* Link to sign up if the user doesn't have an account */}
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
