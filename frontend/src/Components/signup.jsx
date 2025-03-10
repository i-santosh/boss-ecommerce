import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/uservalidation.css";
import "../css/signup.css";
import apiClient from "../../lib/client-axios";

const Signupform = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    contact: "",
    country: "IN",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});
    setSuccessMessage("");

    try {
      const response = await apiClient.post("/accounts/signup/", formData);

      if (response.data.success) {
        setSuccessMessage(response.data.message[0]);

        // Set access and refresh tokens as cookies
        const { access, refresh } = response.data.data;

        Cookies.set("access_token", access.value, { expires: access.max_age / 86400, secure: true, sameSite: "Strict" });
        Cookies.set("refresh_token", refresh.value, { expires: refresh.max_age / 86400, secure: true, sameSite: "Strict" });

        setTimeout(() => navigate(`/email/verify/?email=${formData.email}`), 10);
      } else {
        setError(response.data.message[0]);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const resData = err.response.data;
        setError(resData.message ? resData.message[0] : "Signup failed.");

        if (resData.errors) {
          setFieldErrors(resData.errors); // Set specific field errors
        }
      } else {
        setError("Signup failed. Please check your details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-xl rounded-2xl">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="assets/background/boss-login-edited.png"
            alt="Signup"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign Up</h2>

          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm">{fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Contact</label>
              <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="IN">India</option>
                <option value="US">USA</option>
                <option value="UK">UK</option>
                <option value="AUS">Australia</option>
                <option value="CAN">Canada</option>
              </select>
            </div>

            <button type="submit" className="button-login" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/signin" className="text-red-500 font-medium hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupform;
