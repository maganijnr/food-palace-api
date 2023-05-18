import express from "express";
import protectedRoute from "../middleware/protectedRoutes.js";
import { updateUser } from "../controllers/userControllers.js";

const router = express.Router();

router.patch("/user/update", protectedRoute, updateUser);

export default router;
