# College Exam Management System (CEMS)

The **College Exam Management System (CEMS)** is a robust tool designed to simplify and manage exam processes for academic institutions. It provides tailored Role-Based Access Control (RBAC) functionalities for different stakeholders, including **Students**, **Professors**, **Heads of Departments (HODs)**, and **Academic Coordinators**, ensuring smooth communication and secure handling of exam-related tasks.

## 🚀 Features

### Core Functionalities
1. **Exam Creation**:
   - Professors create exams and we assign them unique `sessionIds` based on course codes.
2. **Exam Scheduling**:
   - Academic Coordinators set the start time for exams. Students can only attempt exams after the designated start time.
3. **Exam Attempt**:
   - Students attempt exams during the scheduled window and submit their responses.
4. **Submission Review**:
   - Professors view all student submissions for a session and assign marks for each question. Marks are submitted one student at a time.
5. **Result Approval**:
   - HODs review the exam status based on the number of evaluated submissions and decide whether to approve the results.
6. **Result Publication**:
   - Academic Coordinators publish the results after HOD approval. Students can view their results only after publication.

### Security Features
1. **OAuth Integration**:
   - Secure authentication for all users.
2. **JWT Authentication**:
   - Backend routes are protected using JSON Web Tokens (JWT) and middleware. Each role (Student, Professor, HOD, Academic Coordinator) can only access authorized routes.

### Technology Stack
- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Authentication**: OAuth, JWT
- **Form Validation**: Formik, Yup
- **HTTP Requests**: Axios

---

## 🛠️ How It Works

### Workflow Overview
1. **For Professors**:
   - Login to the system.
   - Create an exam, generating a unique `sessionId`.
   - Review student submissions, assign marks, and submit results.
2. **For Academic Coordinators**:
   - Set the start time for exams.
   - Approve and publish results after HOD approval.
3. **For HODs**:
   - View exam result statuses.
   - Approve results for publication after reviewing the number of evaluated submissions.
4. **For Students**:
   - Login to view available exams.
   - Attempt exams during the allowed time window.
   - View results after publication.

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

2. Create a `.env` file in the `backend` directory:  
    ```bash  
    touch backend/.env  
    ```  

3. Add the following variables to the `.env` file:  
    ```env  
    PORT=3001  
    MONGO_URL=mongodb://localhost:27017/exam-system  
    JWT_SECRET=your_jwt_secret  
    GOOGLE_CLIENT_ID=your_google_client_id  
    GOOGLE_CLIENT_SECRET=your_google_client_secret  
    ```  

4. Install dependencies and start the server:  
    ```bash  
    cd backend  
    npm install  
    npm run dev  
    ```  

### Frontend Setup  

1. Navigate to the frontend directory:  
    ```bash  
    cd ../frontend  
    ```  

2. Create a `.env` file in the `frontend` directory:  
    ```bash  
    touch .env  
    ```  

3. Add the following variables to the `.env` file:  
    ```env  
    VITE_BACKEND_URL=http://localhost:3001  
    VITE_GOOGLE_CLIENT_ID=your_google_client_id  
    ```  

4. Install dependencies and start the development server:  
    ```bash  
    npm install  
    npm run dev  
    ```  

## Notes  
Make sure to replace placeholders like `your_jwt_secret`, `your_google_client_id`, and `your_google_client_secret` with your actual credentials before running the application.
