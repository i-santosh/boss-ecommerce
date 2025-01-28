import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Uservalidation = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup






  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-xl rounded-2xl">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2  ">
          <img src="assets\background\boss-login-edited.png" alt="Placeholder" className="w-full h-full object-cover rounded-2xl" />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="text-center mt-4">
            <button
              className="text-hsl(353, 100%, 78%) font-medium hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
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

navigate('/account')





}

const forgotpassword=()=>{


  navigate('/forgotpassword')
}






  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Login</h2>
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
        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-hsl(353, 100%, 78%) text-black px-4 py-2 rounded-lg hover:bg-hsl(353, 100%, 68%)"
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
const SignupForm = () => {
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
            id="confirm-password"
            name="confirm-password"
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

        <button
          type="submit"
          className="bg-hsl(353, 100%, 78%) text-white px-4 py-2 rounded-lg hover:bg-hsl(353, 100%, 68%) mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Uservalidation;
