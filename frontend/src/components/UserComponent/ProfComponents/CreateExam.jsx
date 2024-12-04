import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../utils/AxiosInstance.js"; // Adjust the path if needed
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";

const CreateExam = () => {
    const { email: paperSetter } = useSelector(selectUser);

    const [questions, setQuestions] = useState([{ question: "" }]);
    const [answers, setAnswers] = useState([{ answer: "" }]);
    const [students, setStudents] = useState([""]);

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            courseCode: "",
            durationOfExam: "",
            description: "",
        },
        validationSchema: Yup.object({
            courseCode: Yup.string()
                .required("Course code is required")
                .max(10, "Course code must not exceed 10 characters"),
            durationOfExam: Yup.number()
                .required("Duration of exam is required")
                .min(1, "Duration must be at least 1 minute")
                .max(300, "Duration cannot exceed 300 minutes"),
            description: Yup.string().max(500, "Description cannot exceed 500 characters"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!paperSetter) {
                alert("Paper setter email is not available.");
                return;
            }

            try {
                // Convert questions, answers, and students to desired formats
                const questionsMap = {};
                const answersMap = {};

                questions.forEach((q, index) => {
                    if (q.question.trim()) questionsMap[index + 1] = q.question.trim();
                });

                answers.forEach((a, index) => {
                    if (a.question.trim()) answersMap[index + 1] = a.question.trim();
                });

                const response = await axiosInstance.post("/professor/create-exam", {
                    ...values,
                    paperSetter,
                    questions: questionsMap,
                    answerkey: answersMap,
                    studentsEnrolled: students.filter((email) => email.trim()),
                });

                alert("Exam created successfully!");
                resetForm();
                setQuestions([{ question: "" }]);
                setAnswers([{ answer: "" }]);
                setStudents([""]);
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || "Failed to create exam.");
            }
        },
    });

    // Handlers for dynamic fields
    const addField = (setter, array) => setter([...array, { question: "" }]);
    const removeField = (setter, array, index) => setter(array.filter((_, i) => i !== index));
    const updateField = (setter, array, index, value) => {
        const updatedArray = [...array];
        updatedArray[index] = { question: value };
        setter(updatedArray);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-[50vw]">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Exam</h1>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Course Code */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Course Code</label>
                        <input
                            type="text"
                            name="courseCode"
                            value={formik.values.courseCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full border bg-white p-2 rounded ${formik.touched.courseCode && formik.errors.courseCode
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />
                        {formik.touched.courseCode && formik.errors.courseCode && (
                            <p className="text-red-500 text-sm">{formik.errors.courseCode}</p>
                        )}
                    </div>

                    {/* Dynamic Questions */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Questions</label>
                        {questions.map((q, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={q.question}
                                    onChange={(e) => updateField(setQuestions, questions, index, e.target.value)}
                                    className="w-full border bg-white p-2 rounded"
                                    placeholder={`Question ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField(setQuestions, questions, index)}
                                    className="ml-2 text-red-500"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addField(setQuestions, questions)}
                            className="text-blue-500"
                        >
                            + Add Question
                        </button>
                    </div>

                    {/* Dynamic Answers */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Answers</label>
                        {answers.map((a, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={a.answer}
                                    onChange={(e) => updateField(setAnswers, answers, index, e.target.value)}
                                    className="w-full border bg-white p-2 rounded"
                                    placeholder={`Answer ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField(setAnswers, answers, index)}
                                    className="ml-2 text-red-500"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addField(setAnswers, answers)}
                            className="text-blue-500"
                        >
                            + Add Answer
                        </button>
                    </div>

                    {/* Dynamic Students Enrolled */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Students Enrolled</label>
                        {students.map((email, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => {
                                        const updated = [...students];
                                        updated[index] = e.target.value;
                                        setStudents(updated);
                                    }}
                                    className="w-full border bg-white p-2 rounded"
                                    placeholder="Student Email"
                                />
                                <button
                                    type="button"
                                    onClick={() => setStudents(students.filter((_, i) => i !== index))}
                                    className="ml-2 text-red-500"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setStudents([...students, ""])}
                            className="text-blue-500"
                        >
                            + Add Student
                        </button>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Duration of Exam (minutes)</label>
                        <input
                            type="number"
                            name="durationOfExam"
                            value={formik.values.durationOfExam}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full bg-white border p-2 rounded ${formik.touched.durationOfExam && formik.errors.durationOfExam
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                        />
                        {formik.touched.durationOfExam && formik.errors.durationOfExam && (
                            <p className="text-red-500 text-sm">{formik.errors.durationOfExam}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Description (optional)</label>
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full bg-white border p-2 rounded ${formik.touched.description && formik.errors.description
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                            rows="2"
                        />
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-red-500 text-sm">{formik.errors.description}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Create Exam
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateExam;
