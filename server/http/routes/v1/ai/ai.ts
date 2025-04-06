import express from "express";
import openai from "../../../lib/openai";

import { getFile } from "../../middleware/getFile";
import { getUserId } from "../../middleware/getUserId";
import { validateReadAccess } from "../../middleware/validateReadAccess";
// import { validateReadWriteAccess } from "../../middleware/validateReadWriteAccess";
// import { requireUser } from "../../middleware/requireUser";

const router = express.Router();

router.get(
	"/summerize-text",
	getUserId,
	getFile,
	validateReadAccess,
	async (req: any, res: any) => {
		// get the file
		const file = await req.file.populate("entities");
		// get the text

		const texts = file.entities.map((entity: any) => {
			if (entity.type === "textarea") {
				return entity.data;
			}
		});
		if (texts.length === 0) {
			res.status(400).json({ message: "No text found in file" });
			return;
		}

		try {
			const completion = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content:
							"You are a helpful assistant that summarizes long text into concise summaries. Summerize the following text in a short and clear summary:",
					},
					{
						role: "user",
						content: texts.join("\n"),
					},
				],
			});

			const summary =
				completion.choices[0]?.message?.content || "No summary generated.";
			res.json({ summary, message: "Successfully summarized text." });
		} catch (err: any) {
			console.error(err);
			res.status(500).json({ message: err.message });
		}
	}
);

router.get(
	"/generate-msqs",
	getUserId,
	getFile,
	validateReadAccess,
	async (req: any, res: any) => {
		// get the file
		const file = await req.file.populate("entities");
		// get the text

		const texts = file.entities.map((entity: any) => {
			if (entity.type === "textarea") {
				return entity.data;
			}
		});
		if (texts.length === 0) {
			res.status(400).json({ message: "No text found in file" });
			return;
		}

		try {
			const completion = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: `You are a MCQ generator, generate ${
							req.query.count || "2"
						} multiple choice questions from the following text.
                            Each question should have 4 options and a correct answer. Your response sould be a stringified JSON in this format: 
                            [{
		question: string;
		optionsList: Array<option>;
		correctAnsIndex: number;
	}]
        It is important that you keep the variables as they are.`,
					},
					{
						role: "user",
						content: texts.join("\n"),
					},
				],
			});

			const response =
				completion.choices[0]?.message?.content || "No msqs generated.";
			const parsedResponse = JSON.parse(response);
			res.json({
				msq: parsedResponse,
				message: "Successfully generated msqs.",
			});
		} catch (err: any) {
			console.error(err);
			res.status(500).json({ message: err.message });
		}
	}
);

export default router;
