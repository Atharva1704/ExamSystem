import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import profRoutes from "./routes/prof.js";
import hodRoutes from "./routes/hod.js"
import acadRoutes from "./routes/acad.js"
import { isStudent, isHOD, isProfessor, isAcademicCoordinator } from './middlewares/checkRole.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("hiii");
});



app.get('/student-route', isStudent, (req, res) => {
    res.send("Welcome, Student!");
});

app.get('/hod-route', isHOD, (req, res) => {
    res.send("Welcome, Head of Department!");
});

app.get('/professor-route', isProfessor, (req, res) => {
    res.send("Welcome, Professor!");
});

app.get('/academic-coordinator-route', isAcademicCoordinator, (req, res) => {
    res.send("Welcome, Academic Coordinator!");
});

app.use("/auth", authRoutes);
app.use("/student", studentRoutes);
app.use("/professor", profRoutes);
app.use("/hod", hodRoutes);
app.use("/acad", acadRoutes);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}.`))

    }).catch((error) => console.log(`${error} did not connect`))
