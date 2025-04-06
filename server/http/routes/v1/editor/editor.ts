import express from "express";
import moment from "moment";

import User from "../../../models/User";
import File from "../../../models/File";
import Entity from "../../../models/Entity";

import { getFile } from "../../middleware/getFile";
import { getUserId } from "../../middleware/getUserId";
import { validateReadAccess } from "../../middleware/validateReadAccess";
import { validateReadWriteAccess } from "../../middleware/validateReadWriteAccess";
import { requireUser } from "../../middleware/requireUser";

import { saveEntities, deleteEntities } from "./utils/entityOperations";

const router = express.Router();

router.post("/new", getUserId, async (req: any, res: any) => {
	console.log("==================Reached: post /new==================");
	try {
		const user = await User.findById(req.user_id);
		if (!user) {
			res.status(400).json({ message: "Invalid User" });
			return;
		}

		const file = new File({
			admin: req.user_id,
			contributors: [],
			public: false,
			createdAt: moment().format("YYYY-MM-DD"),
			title: req.body.title,
			desc: req.body.desc,
			entities: [],
		});
		await file.save();

		user?.files.push(file._id);
		await user?.save();

		res.status(200).json({
			message: "Successfully created a new post",
			file,
		});
		return;
	} catch (err: any) {
		console.error("Error from POST editor/new: ", err.message);
		res.status(400).json({
			message: err.message,
		});
		return;
	}
});

router.get(
	"/get",
	getUserId,
	getFile,
	validateReadAccess,
	async (req: any, res: any) => {
		console.log("==================Reached: get /get==================");
		const file = await req.file.populate("entities");
		res.status(200).json({
			message: "successfully recieved the file",
			file,
		});
	}
);

router.get(
	"/verify-read-access",
	getUserId,
	requireUser,
	getFile,
	validateReadAccess,
	(req: any, res: any) => {
		console.log("=========Reached get editor/verify-read-access=========");
		res.status(200).json({
			message: "Read Access Granted",
		});
	}
);
router.get(
	"verify-write-access",
	getUserId,
	requireUser,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	(req: any, res: any) => {
		res.status(200).json({
			message: "Write Access Granted",
		});
	}
);

// edit all entities
router.put(
	"/edit/all",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log("==================Reached: put /edit/all==================");
		try {
			const file = req.file;
			const entities = req.body.entities;

			file.entities = await saveEntities(entities);
			await file.save();
			res.status(200).json({
				message: "Successfully Updated all entities",
				file,
			});
			await deleteEntities(entities);
			return;
		} catch (err: any) {
			console.error("Error from PUT editor/edit/all: ", err.message);
			res.status(400).json({
				message: err.message,
			});
			return;
		}
	}
);

// push entity
router.put(
	"/edit/push",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log("==================Reached: put /edit/push==================");
		try {
			const file = req.file;
			const { type, data } = req.body;

			const entity = new Entity({
				type,
				data,
			});
			await entity.save();

			file.entities.push(entity);
			await file.save();

			res.status(200).json({
				message: "Successfully Pushed an entity",
				entity,
			});
			return;
		} catch (err: any) {
			console.error("Error from PUT editor/edit/push: ", err.message);
			res.status(400).json({
				message: err.message,
			});
			return;
		}
	}
);

// edit an entity
router.put(
	"/edit/entity-at-index",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: put /edit/entity-at-index=================="
		);
		try {
			const { index, data, type } = req.body;
			const file = req.file;
			const entity: any = await Entity.findById(file.entities[index]._id);
			if (entity == null) {
				console.log("No element found to edit");
				console.log(file);
				console.log(index);
				res.status(400).json({
					message: "No Element Found to edit",
				});
				return;
			}

			if (entity.type != type) {
				res.status(400).json({
					message: "Entity type mismatch;",
				});
				return;
			}
			entity.data = data;
			await entity.save();

			res.status(200).json({
				message: "successfully edited an entity",
				entity,
			});
		} catch (err: any) {
			console.error(
				"Error from PUT editor/edit/entity-at-index: ",
				err.message
			);
			res.status(400).json({
				message: err.message,
			});
		}
	}
);

// delete an entity
router.delete(
	"/edit/entity-at-index",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: delete /edit/entity-at-index=================="
		);
		try {
			const { index } = req.body;
			let file = req.file;
			const entity: any = await Entity.findByIdAndDelete(
				file.entities[index]._id
			);
			if (entity == null) {
				console.log(file);
				console.log(index);
				res.status(400).json({
					message: "No Element Found to delete",
				});
				return;
			}
			file.entities.splice(index, 1);
			await file.save();

			res.status(200).json({
				message: "Successfully deleted the entity",
			});
		} catch (err: any) {
			console.error(
				"Error from DELETE editor/edit/entity-at-index: ",
				err.message
			);
			res.status(400).json({
				message: err.message,
			});
		}
	}
);

// change title
router.put(
	"/edit/set-title",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: put /edit/set-title=================="
		);
		try {
			const file = req.file;
			const { title } = req.body;

			file.title = title;
			await file.save();

			res.status(200).json({
				message: "Successfully Changed the Title",
				title,
			});
			return;
		} catch (err: any) {
			console.error("Error from PUT editor/edit/set-title: ", err.message);
			res.status(400).json({
				message: err.message,
			});
			return;
		}
	}
);

// change desc
router.put(
	"/edit/set-desc",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: put /edit/set-desc=================="
		);
		try {
			const file = req.file;
			const { desc } = req.body;

			file.desc = desc;
			await file.save();

			res.status(200).json({
				message: "Successfully Changed the Description",
				desc,
			});
			return;
		} catch (err: any) {
			console.error("Error from PUT editor/edit/set-desc: ", err.message);
			res.status(400).json({
				message: err.message,
			});
			return;
		}
	}
);

// change order

// add contributor
router.put(
	"/edit/add-contributor",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: put /edit/add-contributor=================="
		);
		try {
			const file = req.file;
			const { username, email, id } = req.body;

			let contributor = null;

			if (
				contributor == null &&
				username != null &&
				username != undefined &&
				username != ""
			) {
				contributor = await User.findOne({ username: username });
			}
			if (
				contributor == null &&
				email != null &&
				email != undefined &&
				email != ""
			) {
				contributor = await User.findOne({ email: email });
			}
			if (contributor == null && id != null && id != undefined && id != "") {
				contributor = await User.findById(id);
			}

			if (!contributor) {
				res.status(400).json({
					message: "Invalid username or email!",
				});
				return;
			}

			const filtered = file.contributors.find(
				(c: any) => c._id.toString() === contributor._id.toString()
			);

			if (filtered != undefined) {
				res.status(400).json({
					message: "Contributor is already added!",
				});
				return;
			}
			file.contributors.push(contributor);
			await file.save();

			res.status(200).json({
				message: "Successfully Added the contributor",
				contributor: {
					username: contributor.username,
					email: contributor.email,
					id: contributor._id,
				},
			});
			return;
		} catch (err: any) {
			console.error(
				"Error from PUT editor/edit/add-contributors: ",
				err.message
			);
			res.status(400).json({
				message: err.message,
			});
			return;
		}
	}
);

// remove contributor
router.put(
	"/edit/remove-contributor",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: put /edit/remove-contributor=================="
		);
		try {
			const file = req.file;
			const { username, email, id } = req.body;

			let contributor = null;

			if (
				contributor == null &&
				username != null &&
				username != undefined &&
				username != ""
			) {
				contributor = await User.findOne({ username: username });
			}
			if (
				contributor == null &&
				email != null &&
				email != undefined &&
				email != ""
			) {
				contributor = await User.findOne({ email: email });
			}
			if (contributor == null && id != null && id != undefined && id != "") {
				contributor = await User.findById(id);
			}

			if (!contributor) {
				res.status(400).json({
					message: "Invalid username or email!",
				});
				return;
			}
			file.contributors = file.contributors.filter(
				(c: any) => c._id.toString() !== contributor._id.toString()
			);

			await file.save();
			res.status(200).json({
				message: "Successfully removed the contributor",
			});
			return;
		} catch (err: any) {
			console.error("Error from PUT editor/edit/remove: ", err.message);
			res.status(400).json({
				message: err.message,
			});
			return;
		}
	}
);

// change visibility
router.put(
	"/edit/set-visibility",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: put /edit/set-visibility=================="
		);
		try {
			const file = req.file;
			const { isPublic } = req.body;

			file.public = isPublic;
			await file.save();

			res.status(200).json({
				message: "Successfully Changed Visibility",
				public: file.public,
			});
			return;
		} catch (err: any) {
			console.error("Error from PUT editor/edit/set-visibility: ", err.message);
			res.status(400).json({
				message: err.message,
			});
			return;
		}
	}
);

router.delete(
	"/delete",
	getUserId,
	getFile,
	validateReadAccess,
	validateReadWriteAccess,
	async (req: any, res: any) => {
		console.log(
			"==================Reached: DELETE /editor/delete=================="
		);
		try {
			const { user, file } = req;

			const filtered = user.files.filter(
				(f_id: any) => f_id.toString() != file._id.toString()
			);

			user.files = filtered;
			await user.save();
			await File.findByIdAndDelete(file._id);

			res.status(200).json({
				message: "Successfully deleted the file",
				files: filtered,
			});
			return;
		} catch (err: any) {
			console.error("Error from DELETE editor/delete", err.message);
			res.status(400).json({
				message: err.message,
			});
		}
	}
);

export default router;
