import express from "express";
import protectedRoute from "../middleware/protectedRoutes.js";
import { getUserProfile, updateUser } from "../controllers/userControllers.js";

const router = express.Router();

router.patch("/user/update", protectedRoute, updateUser);
router.get("/user/profile/:userId", protectedRoute, getUserProfile);

export default router;
