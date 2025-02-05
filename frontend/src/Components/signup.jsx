import React from "react";
import '../css/uservalidation.css';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";






const Signupform = () => {



  const navigate = useNavigate();
  const signin = () => {

    navigate('/signin')

  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-xl rounded-2xl">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2  ">

          <img src="assets\background\boss-login-edited.png" alt="Placeholder" className="w-full h-full object-cover rounded-2xl" />

        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <Signup />
          <div className="text-center mt-4">
            <button
              className="text-hsl(353, 100%, 78%) font-medium hover:underline"
              onClick={() => { signin() }}
            >
              "Already have an account? Login"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




const Signup = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sign Up</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Confirm your password"
            required
          />
        </div>
        {/* 
                  
                  phone number field
                  
                  */}

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">Contact</label>
          <input
            type="number"
            id="contact-field"
            name="contact"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Enter your contact number"
            required
          />
        </div>



        {/* 
                  
                  country field
                  
                  */}

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">Country</label>
          <select name="" id=""

            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%)"
            placeholder="Enter your contact number"
            required

          >
            <option value="">INDIA</option>
            <option value="">US</option>
            <option value="">UK</option>
            <option value="">AUS</option>
            <option value="">ENG</option>
            <option value="">CAN</option>
          </select>
        </div>



        {/* 
                  
                  country field end
                  
                  */}
<Link to="/email/confirm/">
        <button
          type="submit"
          class="button-login"
        >
          Sign Up
        </button>
        </Link>
      </form>
    </div>
  );
};




export default Signupform;