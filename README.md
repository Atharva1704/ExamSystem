# ExamSystem: A MERN Stack Examination Management System

## **Overview**
ExamSystem is a secure and user-friendly MERN stack web application designed to streamline the examination process for colleges. By leveraging Role-Based Access Control (RBAC), the platform ensures that each user—whether a Student, Professor, HOD, or Academic Coordinator—has access to resources and functionalities tailored to their role. The integration of Google OAuth provides secure authentication, and JWT-based middlewares protect backend endpoints.

---

## **Features**

### **Role-Specific Functionality**
1. **Student**:
   - Attempt assigned exams and submit responses.
   - View exam details, including dates and seating arrangements.
   - Submit grievances for revaluation.

2. **Professor**:
   - Access and evaluate responses submitted by students.
   - Grade students and forward results to the HOD.

3. **HOD (Head of Department)**:
   - Review and approve submitted results.
   - Evaluate revaluation requests submitted by students.
   - Forward approved results to the Academic Coordinator.

4. **Academic Coordinator**:
   - Schedule exams and allocate seating arrangements.
   - Notify students and professors of exam schedules.

---

### **Security Highlights**
- **Google OAuth Authentication**: Secure login for all users via Google.
- **RBAC with JWT Middleware**: 
  - Middleware validates JWT tokens to ensure authorized access to APIs based on user roles.
  - Unauthorized users are blocked from accessing restricted resources.

---

## **Tech Stack**

### **Frontend**
- **React.js** (with Vite for fast development and build)
- **Redux** for state management
- **Tailwind CSS** for responsive and modern UI

### **Backend**
- **Node.js** with **Express.js**
- **MongoDB** for database storage
- **Mongoose** for schema and data modeling
- **JWT** for token-based authentication

---

## **Getting Started**

### **Prerequisites**
- Node.js installed on your system.
- MongoDB set up locally or hosted (e.g., MongoDB Atlas).
- A Google Developer account to set up Google OAuth credentials.

---

### **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ExamSystem.git
   cd ExamSystem
