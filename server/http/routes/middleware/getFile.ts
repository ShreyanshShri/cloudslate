import { Request, Response, NextFunction } from "express";

// https://stackoverflow.com/questions/58200432/argument-of-type-req-request-res-iresponse-next-nextfunction-void-is

import File from "../../models/File";

import { fileType } from "../../models/File";

interface Req extends Request {
	file: fileType | null;
}

export const getFile = async (req: any, res: any, next: any): Promise<any> => {
	console.log("Reached: getFile");
	const file_id = req.query.id;

	// verify if id is correct
	if (file_id === "" || file_id === undefined || file_id === null) {
		res.status(400).json({
			message: "Please Provide File Id",
		});
		return;
	}

	try {
		// get file
		const fully_populated = await File.findById(file_id)
			.populate({
				path: "admin",
				select: "username email",
			})
			.populate({
				path: "contributors",
				select: "username email",
			});
		req.file = fully_populated;
		next();
	} catch (err: any) {
		// catch error (invalid file id probably)
		console.log(err.message);
		res.status(400).json({ message: err.message });
		return;
	}
};
