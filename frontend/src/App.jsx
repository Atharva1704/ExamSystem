import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleLoginComponent from "./components/UserComponent/GoogleLogin/GoogleLoginComponent";
import HomePage from "./components/UserComponent/HomePage/HomePage";
import StudentNavbar from "./components/UserComponent/Navbar/StudentNavbar";
import HoDNavbar from "./components/UserComponent/Navbar/HoDNavbar";
import ProfNavbar from "./components/UserComponent/Navbar/ProfNavbar";
import AcadNavbar from "./components/UserComponent/Navbar/AcadNavbar";
// import CheckResults from "./components/HoD/CheckResults";
// import ApprovedResults from "./components/HoD/ApprovedResults";
// import NewExam from "./components/Professor/NewExam";
// import CheckExam from "./components/Professor/CheckExam";
// import FetchApproved from "./components/AcademicCoordinator/FetchApproved";
import Exam from "./components/UserComponent/Student/Exam";
import ExamPage from "./components/UserComponent/Student/ExamPage";
// import Result from "./components/Student/Result";
import "./App.css";

// Custom Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const userRole = useSelector((state) => state.user.role);

  // Check if user is authenticated and has the correct role
  if (!jwtToken) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return element;
};

function App() {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const isAuth = Boolean(jwtToken);
  console.log(isAuth)

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<GoogleLoginComponent />} />

        {/* Home Route */}
        <Route
          path="/home"
          element={
            isAuth ? (
              <HomePage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Student Routes */}
        <Route
          path="/exam"
          element={
            <ProtectedRoute element={<Exam />} allowedRoles={["student"]} />
          }
        />
        <Route
          path="/exam/:sessionId"
          element={<ProtectedRoute element={<ExamPage />} allowedRoles={["student"]} />}
        />
        {/* <Route
          path="/result"
          element={
            <ProtectedRoute element={<Result />} allowedRoles={["student"]} />
          }
        /> */}

        {/* HoD Routes */}
        {/* <Route
          path="/check-results"
          element={
            <ProtectedRoute element={<CheckResults />} allowedRoles={["Head_of_Department"]} />
          }
        />
        <Route
          path="/approved-results"
          element={
            <ProtectedRoute element={<ApprovedResults />} allowedRoles={["Head_of_Department"]} />
          }
        /> */}

        {/* Professor Routes */}
        <Route
          path="/new-exam"
          element={<ProtectedRoute element={<ProfNavbar />} allowedRoles={["Professor"]} />}
        />
        {/* <Route
          path="/check-exam"
          element={<ProtectedRoute element={<CheckExam />} allowedRoles={["Professor"]} />}
        /> */}

        {/* Academic Coordinator Routes */}
        {/* <Route
          path="/fetch-approved"
          element={
            <ProtectedRoute element={<FetchApproved />} allowedRoles={["Academic_Coordinator"]} />
          }
        />  */}
      </Routes>
    </Router>
  );
}

export default App;
