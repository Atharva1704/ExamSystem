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
import SetStart from "./components/UserComponent/AcadComponents/SetStart";
import FetchApproved from "./components/UserComponent/AcadComponents/FetchApproved";
import FetchUnapprovedResults from "./components/UserComponent/HodComponents/FetchUnapprovedResults";
import ViewResult from "./components/UserComponent/Student/ViewResults";
import CreateExam from "./components/UserComponent/ProfComponents/CreateExam";
import SessionList from "./components/UserComponent/ProfComponents/SessionList";
import ResultSession from "./components/UserComponent/ProfComponents/ResultSession";
import ApprovedResults from "./components/UserComponent/HodComponents/ApprovedResults";

// Custom Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { role: userRoles } = useSelector((state) => state.user); // Get user roles from Redux store

  // Check if the user has any of the allowed roles
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/home" />; // Redirect to an unauthorized page or login
  }

  return element; // If the user has access, render the component
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
            <ProtectedRoute element={<Exam />} allowedRoles={[1]} />
          }
        />
        <Route
          path="/exam/:sessionId"
          element={<ProtectedRoute element={<ExamPage />} allowedRoles={[1]} />}
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute element={<ViewResult />} allowedRoles={[1]} />
          }
        />

        {/* Professor Routes */}
        <Route
          path="/new-exam"
          element={<ProtectedRoute element={<CreateExam />} allowedRoles={[2]} />}
        />
        <Route
          path="/check-exam"
          element={<ProtectedRoute element={<SessionList />} allowedRoles={[2]} />}
        />
        <Route
          path="/check-exam/:sessionId"
          element={<ProtectedRoute element={<ResultSession />} allowedRoles={[2]} />}
        />

        {/* HoD Routes */}
        <Route
          path="/check-results"
          element={
            <ProtectedRoute element={<FetchUnapprovedResults />} allowedRoles={[3]} />
          }
        />
        <Route
          path="/hod/approved-results"
          element={
            <ProtectedRoute element={<ApprovedResults />} allowedRoles={[3]} />
          }
        />

        {/* Academic Coordinator Routes */}
        <Route
          path="/fetch-approved"
          element={
            <ProtectedRoute element={<FetchApproved />} allowedRoles={[4]} />
          }
        />
        <Route
          path="/set-exam-start"
          element={
            <ProtectedRoute element={<SetStart />} allowedRoles={[4]} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
