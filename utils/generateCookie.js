import { getJwtToken } from "../helpers/generateToken.js";

const cookieToken = async (user, res, code) => {
	const token = getJwtToken(user.id);

	const options = {
		expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	user.password = null;

	res.status(code).cookie("token", token, options).json({
		success: true,
		token,
		user,
	});
};

export { cookieToken };
