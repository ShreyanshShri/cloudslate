import mongoose, { Types } from "mongoose";

export interface entityType {
  _id: Types.ObjectId;
  type: string;
  data?: string;
}

const entitySchema = new mongoose.Schema<entityType>({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
});

export default mongoose.model("Entity", entitySchema);
