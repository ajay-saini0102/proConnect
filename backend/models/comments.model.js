import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentsSchema);
export default Comment;
