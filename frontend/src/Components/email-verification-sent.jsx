import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button } from './ui-card/card-button';

export default function EmailVerificationSent() {
    const [email, setEmail] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        // Get email from URL query params
        const queryParams = new URLSearchParams(window.location.search);
        const emailFromUrl = queryParams.get('email');
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, []);

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(false); // Clear error when user starts editing
    };

    const handleSubmit = () => {
        // Add your email validation logic here
        if (!validateEmail(email)) {
            setEmailError(true);
        }
    };

    const validateEmail = (email) => {
        // Simple email validation (you can replace with a more robust one)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
            <Card style={{ width: '400px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                <CardContent style={{ padding: '30px' }}>
                    <h3 style={{ textAlign: 'center', color: '#333', fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }}>
                        We've sent a confirmation link to your email!
                    </h3>
                    <p style={{ textAlign: 'center', color: '#777', fontSize: '14px', marginBottom: '20px' }}>
                        Please check your inbox and follow the instructions to verify your email address.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter verification code"
                            style={{
                                height: '50px',
                                width: '80%',
                                paddingLeft: '15px',
                                border: `1px solid ${emailError ? '#f87171' : '#f0f4f8'}`,
                                borderRadius: '8px',
                                fontSize: '16px',
                                color: '#333',
                                outlineColor: '#f87171',
                                outline: 'none',
                                backgroundColor: isEditable ? '#fff' : '#f0f4f8',
                                cursor: isEditable ? 'text' : 'not-allowed',
                            }}
                            disabled={!isEditable}
                        />
                    </div>
                    {emailError && (
                        <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>
                            The provided email is incorrect. Please enter a valid email address.
                        </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                        <Button
                            onClick={handleEditClick}
                            style={{
                                backgroundColor: '#f87171',
                                color: '#fff',
                                fontSize: '16px',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: 'none',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            {isEditable ? 'Lock Email' : 'Edit Email'}
                        </Button>
                    </div>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Link to="/email/verify/">
                        <Button
                            className="button-verified"
                            style={{
                                backgroundColor: '#f87171',
                                color: '#fff',
                                fontSize: '16px',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: 'none',
                                transition: 'background-color 0.3s ease',
                            }}
                            onClick={handleSubmit}
                        >
                            Resend link
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
