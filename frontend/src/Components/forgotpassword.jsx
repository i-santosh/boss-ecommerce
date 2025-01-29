import React from 'react';
import { useState } from 'react';
import "./ui-card/card,button.jsx"
import { Button, Card } from './ui-card/card,button.jsx';
// import { Card,CardContent,Button} from './ui-card/card,button.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the email (e.g., call an API or validation)
    console.log('Email submitted:', email);
  };

  return (
    <>
      <Card>
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>

          <h2>Reset Password :</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email" style={{ marginBottom: '8px' }}>
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
              style={{
                padding: '10px',
                fontSize: '16px',
                marginBottom: '20px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
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
              Submit
            </button>
          </form>
        </div>
      </Card>
    </>
  );
}
