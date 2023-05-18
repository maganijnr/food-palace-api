import prisma from "../prisma/index.js";

export const uploadMeal = async (req, res) => {
	try {
		const {
			name,
			quantity,
			category,
			preview_image,
			images,
			description,
			price,
		} = req.body;
		const creatorId = req.user.id;

		const meal = await prisma.meal.create({
			data: {
				name,
				quantity,
				category,
				preview_image,
				images,
				description,
				price,
				chefId: creatorId,
			},
		});

		if (meal) {
			res.status(201).json({
				success: true,
				message: "Uploaded successfully",
				meal,
			});
		} else {
			res.json({
				success: false,
				message: "Something went wrong",
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

export const fetchAllMeals = async (req, res) => {
	try {
		const meals = await prisma.meal.findMany();

		if (meals) {
			res.status(200).json({
				success: true,
				message: "Fetched successfully",
				meals,
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

export const updateMeal = async (req, res) => {
	const mealId = req.params.mealId;
	const {
		name,
		quantity,
		category,
		preview_image,
		images,
		description,
		price,
	} = req.body;

	try {
		const updateMeal = await prisma.meal.update({
			where: { id: mealId },
			data: {
				name,
				quantity,
				category,
				preview_image,
				images,
				description,
				price,
			},
		});

		if (updateMeal) {
			res.status(200).json({
				success: true,
				message: "Updated successfully.",
			});
		} else {
			return res.json({
				success: false,
				message: "Something went wrong",
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};
