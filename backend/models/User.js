import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
        },
        collegeId: {
            type: String,
            required: true,
            unique: true, // Ensures no duplicate college IDs
        },
        role: {
            type: [Number], // Array of numbers for multiple roles
            enum: [1, 2, 3, 4], // 1 = student, 2 = Professor, 3 = Head_of_Department, 4 = Academic_Coordinator
            required: true,
            default: [1], // Defaults to 'student' role
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Enum mapping for roles
export const RoleEnum = {
    STUDENT: 1,
    PROFESSOR: 2,
    HEAD_OF_DEPARTMENT: 3,
    ACADEMIC_COORDINATOR: 4,
};

const User = mongoose.model("User", userSchema);

export default User;
