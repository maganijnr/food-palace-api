import cloudinary from "cloudinary";
import express from "express";

const router = express.Router();

const cloud = cloudinary.v2;

cloud.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSingleImage = async (image) => {
	return new Promise((resolve, reject) => {
		cloud.uploader.upload(
			image,
			{ overwite: true, invalidate: true, resource_type: "auto" },
			(error, result) => {
				if (result && result.secure_url) {
					return resolve(result.secure_url);
				}

				console.error(error);
				return reject({ message: "Something went wrong" });
			}
		);
	});
};

const uploadMultipleImages = async (images) => {
	return new Promise((resolve, reject) => {
		const uploads = images.map(async (base) => {
			await uploadImage(base);
		});

		Promise.all(uploads)
			.then((values) => resolve(values))
			.catch((err) => reject(err));
	});
};

router.post("/upload-avatar", async (req, res) => {
	const baseImage = req.body.image;
	uploadSingleImage(baseImage)
		.then((url) => res.send(url))
		.catch((err) => console.log(err));
});

router.post("/upload-preview-image", async (req, res) => {
	const baseImage = req.body.image;
	uploadSingleImage(baseImage)
		.then((url) => res.send(url))
		.catch((err) => console.log(err));
});

router.post("/upload-meal-images", async (req, res) => {
	const baseImages = req.body.images;
	uploadMultipleImages(baseImages)
		.then((url) => res.send(url))
		.catch((err) => console.log(err));
});

export default router;
