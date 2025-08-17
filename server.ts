
import express from "express";
import cors from "cors";
import tasksRouter from "./api/tasks";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
