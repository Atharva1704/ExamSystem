import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoogleLoginComponent from './components/UserComponent/GoogleLogin/GoogleLoginComponent';
import HomePage from './components/UserComponent/HomePage/HomePage';
import "./App.css";

function App() {
  // Access jwtToken from Redux store
  const jwtToken = useSelector((state) => state.user.jwtToken);
  useSelector((state) => console.log(state));
  // isAuth will be true if jwtToken exists
  const isAuth = Boolean(jwtToken);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<GoogleLoginComponent />} />

        {/* Private Route */}
        <Route
          path="/home"
          element={
            isAuth ? (
              <HomePage />
            ) : (
              <Navigate to="/" replace /> // Redirect to login if not authenticated
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
