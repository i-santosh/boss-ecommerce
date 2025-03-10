import React, { useState, useEffect } from 'react';
import '../css/uservalidation.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../lib/client-axios';
import { toast } from 'react-fox-toast';
import Cookies from 'js-cookie';
import isAuthenticated from '../../lib/auth';

const Signin = () => {
  const navigate = useNavigate();

  const tosignup = () => {
    navigate('/signup');
  };

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const isAuth = await isAuthenticated(); // Wait for the Promise to resolve
      if (isAuth) {
        navigate('/myaccount');
      }
    }
    checkAuth();
  }, [auth]);



  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-xl rounded-2xl">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="assets/background/boss-login-edited.png"
            alt="Placeholder"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <LoginForm />
          <div className="text-center mt-4">
            <button
              className="text-hsl(353, 100%, 78%) font-medium hover:underline transition-all duration-300"
              onClick={tosignup}
            >
              Don't have an account? Sign Up
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
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Track form validity
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if form is valid whenever formData changes
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid =
      emailRegex.test(formData.email) &&
      formData.password.length >= 6;

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const signin = (await apiClient.post('/accounts/signin/', { ...formData })).data;
      if (signin.success) {
        // Set access token cookie
        Cookies.set('access', signin.data.access.value, {
          expires: new Date(signin.data.access.expires),
          secure: true,
          sameSite: 'strict'
        });

        // Set refresh token cookie
        Cookies.set('refresh', signin.data.refresh.value, {
          expires: new Date(signin.data.refresh.expires),
          secure: true,
          sameSite: 'strict'
        });

        toast.success(signin.message);
        window.location.href = '/';
      } else {
        toast.error(signin.message);
      }
    } catch (error) {
      console.log(error);
      const errResponse = error?.response?.data;
      toast.error(errResponse?.message || 'Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = () => {
    navigate('/forgotpassword');
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome Back</h2>
      <form className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%) transition-all duration-200`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-hsl(353, 100%, 78%) transition-all duration-200`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span className="text-sm">Hide</span>
              ) : (
                <span className="text-sm">Show</span>
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className={`button-login relative ${isFormValid ? 'opacity-100' : 'opacity-70 cursor-not-allowed'
              }`}
            onClick={handleLogin}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
          <button
            type="button"
            className="text-hsl(353, 100%, 78%) font-medium hover:underline transition-all duration-300"
            onClick={forgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;