import express from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import User from "../../../models/User";
import { getUserId } from "../../middleware/getUserId";
import { getFile } from "../../middleware/getFile";

const router = express.Router();

router.post("/register", async (req, res) => {
	console.log(
		"==================Reached: post auth/register=================="
	);
	const { username, email, password } = req.body;
	const saltedPass = await bcrypt.hash(password, 10);

	try {
		// create a user
		const user = new User({ username, email, password: saltedPass });
		await user.save();

		// send token
		const token = jwt.sign({ id: user._id }, process.env.JWT_PVT_KEY);
		res.status(200).json({
			message: "Account Created",
			token,
			user_id: user._id,
		});
		return;
	} catch (err: any) {
		res.status(400).json({
			message: err.message,
		});
		return;
	}
});

router.post("/login", async (req, res) => {
	console.log("==================Reached: post /auth/login==================");
	const { email, password } = req.body;

	try {
		// search for user
		const user: any = await User.findOne({ email: email });
		if (!user) {
			res.status(400).json({
				message: "User Not Found",
			});
			return;
		}

		// compare the password
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			res.status(400).json({
				message: "Invalid Password",
			});
			return;
		}

		// send token
		const token = jwt.sign({ id: user._id }, process.env.JWT_PVT_KEY);
		res.status(200).json({
			message: "Success",
			token,
			user_id: user._id,
		});
		return;
	} catch (err: any) {
		res.status(400).json({
			message: err.message,
		});
		return;
	}
});

router.get("/get", getUserId, async (req: any, res: any) => {
	console.log("==================Reached: post /auth/get==================");
	if (req.user_id === null) {
		res.status(400).json({
			message: "Invalid User Token",
			user_id: req.user._id,
		});
		return;
	}
	// let user = await req.user.populate("files").sort({ files: -1 });
	const user = await User.findById(req.user_id)
		.populate({
			path: "files",
			select: "title desc createdAt",
			options: { sort: { createdAt: -1 } },
		})
		.populate({
			path: "bookmarks",
			select: "title desc createdAt",
		});
	// user = await user.
	res.status(200).json({
		message: "Success",
		user,
	});
	return;
});

router.get("/check-bookmark", getUserId, getFile, async (req: any, res) => {
	console.log(
		"==================Reached: post /auth/get-bookmark=================="
	);
	const { user, file } = req;

	try {
		if (!user) {
			res.status(400).json({
				message: "No user found. Please Login again.",
			});
			return;
		}

		const check = user.bookmarks.find(
			(bookmark: any) => bookmark.toString() === file._id.toString()
		);

		// bookmark doesnt exists
		if (check == undefined) {
			res.status(200).json({
				message: "This file is not bookmarked.",
				status: false,
			});
			return;
		}

		res.status(200).json({
			message: "This file is bookmarked.",
			status: true,
		});
		return;
		return;
	} catch (err: any) {
		console.error(err.message);
		res.status(400).json({
			message: err.message,
		});
		return;
	}
});

router.post("/add-bookmark", getUserId, getFile, async (req: any, res) => {
	console.log(
		"==================Reached: post /auth/add-bookmark=================="
	);
	const { user, file } = req;

	try {
		if (!user) {
			res.status(400).json({
				message: "No user found. Please Login again.",
			});
			return;
		}

		console.log(user.bookmarks);
		const check = user.bookmarks.find(
			(bookmark: any) => bookmark.toString() === file._id.toString()
		);

		// bookmark already exists
		if (check !== undefined) {
			res.status(200).json({
				message: "Bookmark is already added",
				status: true,
			});
			return;
		}

		user.bookmarks.unshift(file._id);
		await user.save();
		res.status(200).json({
			message: "Successfully added bookmark.",
			bookmark: {
				id: file._id,
				title: file.title,
				desc: file.desc,
				createdAt: file.createdAt,
			},
			status: true,
		});
		return;
	} catch (err: any) {
		console.error(err.message);
		res.status(400).json({
			message: err.message,
		});
		return;
	}
});

router.post("/remove-bookmark", getUserId, getFile, async (req: any, res) => {
	console.log(
		"==================Reached: post /auth/remove-bookmark=================="
	);
	const { user, file } = req;

	try {
		if (!user) {
			res.status(400).json({
				message: "No user found. Please Login again.",
			});
			return;
		}

		const filtered = user.bookmarks.filter(
			(bookmark: any) => bookmark.toString() !== file._id.toString()
		);
		user.bookmarks = filtered;
		await user.save();
		res.status(200).json({
			message: "Successfully removed bookmark.",
			status: false,
		});
		return;
	} catch (err: any) {
		console.error(err.message);
		res.status(400).json({
			message: err.message,
		});
		return;
	}
});

export default router;
