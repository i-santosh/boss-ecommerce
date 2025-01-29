import React, { useState } from 'react';
import '../css/uservalidation.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {


const navigate = useNavigate();
const tosignup= ()=>{

navigate('/signup')

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
          <LoginForm /> 
          <div className="text-center mt-4">
            <button
              className="text-hsl(353, 100%, 78%) font-medium hover:underline"
              onClick={()=>{tosignup()}}
            >
               "Don't have an account? Sign Up"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = () => {


    const navigate = useNavigate();

const loginsuccess=()=>{

navigate('/myaccount')





}

const forgotpassword=()=>{


  navigate('/forgotpassword')
}





  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 "  >Login</h2>
      <form className="space-y-4">
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
        
        
        {/* login button */}



        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className=" text-black px-4 py-2 " 
            class="button-login"
          onClick={()=>{loginsuccess()}}>
            Log In
          </button>
          <button
            type="button"
            className="text-hsl(353, 100%, 78%) font-medium hover:underline"
            onClick={()=>{forgotpassword()}}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

// Signup Form Component

export default Signin;
