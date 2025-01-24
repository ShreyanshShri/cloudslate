import express from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import User from "../../../models/User";
import { getUserId } from "../../middleware/getUserId";

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
	const user = await req.user.populate({
		path: "files",
		select: "title createdAt",
		options: { sort: { createdAt: -1 } },
	});
	// user = await user.
	res.status(200).json({
		message: "Success",
		user,
	});
	return;
});

export default router;
