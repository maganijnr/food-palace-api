import jwt from "jsonwebtoken";
import prisma from "../prisma/index.js";

const protectedRoute = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer ")
	) {
		token = req.headers.authorization.split(" ")[1];

		if (!token) {
			res.status(401);
			throw new Error("Not authorized, log in");
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const { userId } = decodedToken;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User does not exist",
			});
		}

		req.user = user;

		next();
	} else {
		return res.status(400).json({
			success: false,
			message: "Not logged in",
		});
	}
};

export default protectedRoute;
