import React, { useState } from 'react';

import '../css/contact.css'
/**
 * MyAccount component that allows users to view and update their account information.
 */
const Contact = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'rohan',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated userInfo to the server
    console.log('Updated User Info:', userInfo);
    alert('Your information has been updated!');
  };

  return (
    <div className="my-account">
      <h2>Account Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <button className='btn-account' type="submit">Update Information</button>
      </form>
    </div>
  );
};

export default Contact;
