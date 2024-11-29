import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importing useDispatch from Redux
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { setLogin } from '../../../redux/userSlice'; // Importing the action
import { useNavigate } from 'react-router-dom';

const GoogleLoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // To dispatch actions to Redux
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const responseGoogle = async (response) => {
        if (!response.credential) {
            setError('Google login failed. Please try again.');
            return;
        }

        const tokenId = response.credential;
        setLoading(true);

        try {
            // Send tokenId to backend for authentication
            const res = await fetch('http://localhost:3001/auth/google/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenId }),
            });

            const data = await res.json();
            // console.log("Data is:", data);
            if (data.token) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', data.token);
                console.log(data.user);
                // Store user data in the Redux store
                dispatch(setLogin({
                    email: data.user.collegeId, jwtToken: data.token, role: data.user.role,
                }));

                // Store user details in local state (optional for showing profile)
                setUser(data.user);
                setToken(data.token);
                setLoading(false);
                navigate("/home");
                // console.log("Login successful", data);
            } else {
                setError("Login failed: " + data.error);
                setLoading(false);
            }
        } catch (err) {
            setError("An error occurred: " + err.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login with Google</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {user ? (
                <div>
                    <h3>Welcome, {user.fullname}</h3>
                    <p>Role: {user.role}</p>
                    <img src={user.picture} alt="Profile" width="100" />
                    <p>College ID: {user.collegeId}</p>
                </div>
            ) : (
                <GoogleOAuthProvider clientId="54142449441-v5qhdcesruq0g0fn0g4mql20erun1edu.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={responseGoogle}
                        onError={() => setError("Google login failed.")}
                    />
                </GoogleOAuthProvider>
            )}
        </div>
    );
};

export default GoogleLoginComponent;
