import mongoose from "mongoose";

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  connectionId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status_accepted: {
    type: Boolean,
    default: null,
  },
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionSchema);

export default ConnectionRequest;
