import mongoose, { Types } from "mongoose";

export interface userType {
	_id: Types.ObjectId;
	username: string;
	email: string;
	password: string;
	files: Types.ObjectId[];
	bookmarks: Types.ObjectId[];
}

const userSchema = new mongoose.Schema<userType>({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
	bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
});

export default mongoose.model("User", userSchema);
