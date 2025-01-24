import mongoose, { Types } from "mongoose";

export interface fileType {
  _id: Types.ObjectId;
  admin: Types.ObjectId;
  contributers: Types.ObjectId[];
  createdAt: Date;
  public: boolean;
  title: string;
  entities: Types.ObjectId[];
}

const fileSchema = new mongoose.Schema<fileType>({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contributers: [
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
  entities: [{ type: Types.ObjectId, ref: "Entity" }],
});

export default mongoose.model("File", fileSchema);
