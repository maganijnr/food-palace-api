import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(
	cors({
		origin: ["http://localhost:5173"],
		credentials: true,
	})
);

//Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", userRoutes);
app.use("/api", mealRoutes);

app.listen(PORT, () => {
	console.log("listening on port 8000");
});
