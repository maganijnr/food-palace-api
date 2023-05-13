import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = 8000;

//Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Routes
app.use("/api", authRoutes);

app.listen(PORT, () => {
	console.log("listening on port 8000");
});
