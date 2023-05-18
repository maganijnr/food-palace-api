import { validateEmail } from "../helpers/validateEmail.js";
import prisma from "../prisma/index.js";
import bcrypt from "bcryptjs";
import { cookieToken } from "../utils/generateCookie.js";

export const signUpUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		if (password.length < 4) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 4 characters",
			});
		}

		const validateMail = validateEmail(email);

		if (!validateMail) {
			return res.status(400).json({
				success: false,
				message: "Enter a valid email address",
			});
		}

		//Check if user Exist already
		const userExist = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userExist) {
			return res.status(400).json({
				success: false,
				message: "User exist already",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await prisma.user.create({
			data: {
				name: name,
				password: hashedPassword,
				email: email,
			},
		});

		cookieToken(newUser, res, 201);
	} catch (error) {
		return res.json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		if (password.length < 4) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 4 characters",
			});
		}

		const validateMail = validateEmail(email);

		if (!validateMail) {
			return res.status(400).json({
				success: false,
				message: "Enter a valid email address",
			});
		}

		//Check if user exist
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User does not exist",
			});
		}

		//Compare password
		const comparePassword = await bcrypt.compare(password, user.password);

		if (!comparePassword) {
			return res.status(400).json({
				success: false,
				message: "Invalid credentials",
			});
		}

		cookieToken(user, res, 200);
	} catch (error) {
		return res.json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};

export const logoutUser = async (req, res) => {
	try {
		res.clearCookie("token");
		res.json({
			success: true,
		});
	} catch (error) {
		return res.json({
			success: false,
			message: "Something went wrong",
			error: error,
		});
	}
};
