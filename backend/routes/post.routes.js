import { Router } from "express";
import {
  activeCheck,
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getCommentsByPost,
  incrementLikes,
} from "../controllers/posts.controller.js";
import multer from "multer";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }, 
});
const upload = multer({ storage: storage });

router.route("/").get(activeCheck);

router.route("/post").post(upload.single("media"), createPost);
router.route("/get_all_post").get(getAllPosts);
router.route("/delete_post").delete(deletePost);
router.route("/create_comment").post(commentPost);
router.route("/get_comments_by_post").get(getCommentsByPost);
router.route("/delete_comments").delete(deleteComment);
router.route("/like_increment").post(incrementLikes);

export default router;
