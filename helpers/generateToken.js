import Jwt from "jsonwebtoken";

export const getJwtToken = (userId) => {
	return Jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, {
		expiresIn: "1 day",
	});
};
