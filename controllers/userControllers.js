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
