import express from "express";
import {
	loginUser,
	logoutUser,
	signUpUser,
} from "../controllers/authControllers.js";

const router = express.Router();

router.route("/auth/signup").post(signUpUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(logoutUser);

export default router;
