import React from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../../lib/client-axios';
import { Card, CardContent, Button } from './ui-card/card-button';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function EmailVerified() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('error');
                setLoading(false);
                return;
            }

            try {
                console.log('Verifying token:', token);
                const response = await apiClient.get(`/accounts/email/verify/?token=${token}`);
                console.log('API Response:', response.data);

                if (response.data.success) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setStatus('error');
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md text-center p-6 shadow-lg rounded-xl bg-white">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-black flex items-center justify-center space-x-2">
                        {loading ? 'Verifying...' : status === 'success' ? (
                            <><CheckCircle className="text-green-500 w-6 h-6" /> <span>Email Verified</span></>
                        ) : (
                            <><AlertCircle className="text-red-500 w-6 h-6" /> <span>Verification Failed</span></>
                        )}
                    </h1>
                </div>
                <CardContent>
                    <p className="text-gray-600">
                        {loading ? 'Please wait while we verify your email...' :
                            status === 'success'
                                ? 'Your email has been successfully verified. Thank you for confirming your account.'
                                : 'The verification link may be invalid or has expired.'}
                    </p>
                </CardContent>
                <div className='mx-auto w-fit'>
                    <Button asChild disabled={loading}>
                        <Link to="/">Go to Dashboard</Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
}