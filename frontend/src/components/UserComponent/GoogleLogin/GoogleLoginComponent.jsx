import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { setLogin } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Register from "./Register.jsx"; // Assuming the register component is in the same directory

const GoogleLoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const responseGoogle = async (response) => {
        if (!response.credential) {
            setError("Google login failed. Please try again.");
            return;
        }

        const tokenId = response.credential;
        setLoading(true);

        try {
            // Send tokenId to backend for authentication
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/google/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tokenId }),
                }
            );

            const data = await res.json();

            if (data.token) {
                // Store the JWT token in localStorage
                localStorage.setItem("token", data.token);

                // Store user data in the Redux store
                dispatch(
                    setLogin({
                        email: data.user.collegeId,
                        jwtToken: data.token,
                        role: data.user.role,
                    })
                );

                // Store user details in local state
                setUser(data.user);
                setToken(data.token);
                setLoading(false);
                navigate("/home");
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">Login or Register</h2>

                {loading && <p className="text-blue-500 text-center mb-4">Loading...</p>}
                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                {user ? (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold">Welcome, {user.fullname}</h3>
                        <p className="text-gray-700">Role: {user.role}</p>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto mt-4"
                        />
                        <p className="text-gray-500 mt-2">College ID: {user.collegeId}</p>
                    </div>
                ) : (
                    <div>
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            <div className="flex justify-center mb-6">
                                <GoogleLogin
                                    onSuccess={responseGoogle}
                                    onError={() => setError("Google login failed.")}
                                />
                            </div>
                        </GoogleOAuthProvider>

                        <div className="border-t border-gray-300 my-6" />

                        <div>
                            <h3 className="text-xl font-bold text-center mb-4">Register</h3>
                            <Register />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoogleLoginComponent;

