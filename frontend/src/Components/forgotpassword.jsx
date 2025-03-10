import React, { useState } from 'react';
import { Card } from './ui-card/card-button';
import apiClient from '../../lib/client-axios';
import { toast } from 'react-fox-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = (await apiClient.post('/accounts/password/reset/request/', { email })).data;
      console.log(response)
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message || 'Failed to send password reset email! Try again.');
      }
    } catch (error) {
      const errResponse = await error?.response?.data;
      toast.error(errResponse.message || 'Something went wrong! Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-600">
          Enter your email address:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-salmon"
        />
        <button
          disabled={loading}
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: 'salmon',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send Password Reset Email'}
        </button>
      </form>
    </Card>
  );
}
