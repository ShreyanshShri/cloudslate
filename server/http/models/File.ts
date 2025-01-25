import mongoose, { Types } from "mongoose";

export interface fileType {
	_id: Types.ObjectId;
	admin: Types.ObjectId;
	contributors: Types.ObjectId[];
	createdAt: Date;
	public: boolean;
	title: string;
	desc: string;
	entities: Types.ObjectId[];
}

const fileSchema = new mongoose.Schema<fileType>({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	contributors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	createdAt: {
		type: Date,
		required: true,
	},
	public: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: "New File",
	},
	desc: {
		type: String,
		default: "",
	},
	entities: [{ type: Types.ObjectId, ref: "Entity" }],
});

export default mongoose.model("File", fileSchema);
