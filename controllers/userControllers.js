import prisma from "../prisma/index.js";

export const updateUser = async (req, res) => {
	const user = req.user;
	const { email, name, avatar } = req.body;

	try {
		const updateUser = await prisma.user.update({
			where: { id: user.id },
			data: { email: email, name: name, avatar: avatar },
		});

		if (updateUser) {
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

export const getUserProfile = async (req, res) => {
	const userId = req.params.userId;

	try {
		const result = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				name: true,
				email: true,
				role: true,
				creadtAt: true,
				id: true,
				avatar: true,
			},
		});

		res.status(200).json({
			success: true,
			message: "User profile was successfully retrieved",
			user: result,
		});
	} catch (error) {
		return res.json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};
