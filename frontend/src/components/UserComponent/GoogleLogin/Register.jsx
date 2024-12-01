import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const roleMapping = {
    student: 1,
    professor: 2,
    Head_of_Department: 3,
    Academic_Coordinator: 4,
};

// Validation Schema
const validationSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    collegeId: Yup.string()
        .email("Invalid email address")
        .required("College ID is required"),
    roles: Yup.array()
        .min(1, "At least one role must be selected")
        .required("Roles are required"),
});

const Register = () => {
    const initialValues = {
        fullname: "",
        collegeId: "",
        roles: [],
    };

    const handleSubmit = async (values) => {
        try {
            // Map role names to numbers
            const formattedRoles = values.roles.map((role) => roleMapping[role]);

            const payload = {
                fullname: values.fullname,
                collegeId: values.collegeId,
                role: formattedRoles,
            };

            // Send request to backend
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
                payload
            );

            console.log("User registered successfully:", response.data);
            alert("User registered successfully!");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Error registering user");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Register User</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <div className="mb-4">
                            <label
                                htmlFor="fullname"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Fullname
                            </label>
                            <Field
                                name="fullname"
                                type="text"
                                placeholder="Enter fullname"
                                className="mt-1 p-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.fullname && touched.fullname && (
                                <p className="text-sm text-red-600 mt-1">{errors.fullname}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="collegeId"
                                className="block text-sm font-medium text-gray-700"
                            >
                                College ID (Email)
                            </label>
                            <Field
                                name="collegeId"
                                type="email"
                                placeholder="Enter email"
                                className="mt-1 p-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.collegeId && touched.collegeId && (
                                <p className="text-sm text-red-600 mt-1">{errors.collegeId}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Select Roles
                            </h3>
                            <div className="space-y-2">
                                {Object.keys(roleMapping).map((role) => (
                                    <label
                                        key={role}
                                        className="flex items-center space-x-2 text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            name="roles"
                                            value={role}
                                            checked={values.roles.includes(role)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span>{role.replace(/_/g, " ")}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.roles && touched.roles && (
                                <p className="text-sm text-red-600 mt-1">{errors.roles}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
