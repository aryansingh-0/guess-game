import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the corresponding form field
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to server with form data
      const response = await axios.post(
        "https://game-server-sb04.onrender.com/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // If user is created, navigate to the login page
      if (response.data.message === "User created") {
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 1 second
        }, 500);
      }
    } catch (error) {
      console.error("Error signing up:", error); // Log error in case of failure
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-500">
      <div className=" bg-orange-100 p-8 rounded-md shadow-md w-full max-w-md">
        {/* Signup form header */}
        <h2 className="text-[2.5vmax] font-mono font-semibold mb-6 text-center">
          Sign Up
        </h2>

        {/* Signup form */}
        <form onSubmit={handleSubmit}>
          {/* Name input field */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Username input field */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Password input field */}
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Signup button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to login page */}
        <p className="mt-4 text-center">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login now.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
