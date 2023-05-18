import express from "express";
import adminProtect from "../middleware/adminProtect.js";
import {
	fetchAllMeals,
	updateMeal,
	uploadMeal,
} from "../controllers/mealController.js";

const router = express.Router();

router.post("/meal/upload", adminProtect, uploadMeal);
router.patch("/meal/upload/:mealId", adminProtect, updateMeal);
router.get("/meals", fetchAllMeals);

export default router;
