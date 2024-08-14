import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import dummyRoutes from "./routes/dummy.js";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env);

const app = express();
console.log("running server");

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", authRoutes);
// app.use("/api", dummyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
