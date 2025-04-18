import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comments.model.js";

export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "Running" });
};

export const createPost = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    
    
    const post = new Post({
      userId: user._id,
      body: req.body.body,
      media: req.file != undefined ? req.file.filename : "",
      fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
    });
    await post.save();
    return res.json({ message: "Post Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate(
      "userId",
      "name username emial profilePicture"
    );
    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }
    return res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { token, post_id } = req.body;
  try {
    const user = await User.findOne({ token: token }).select("_id");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      return res.status(404).json({ message: "Posts not found" });
    }
    if (post.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorised Account" });
    }

    await Post.deleteOne({ _id: post_id });

    return res.json({ message: "Post Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  const { token, post_id, comment_body} = req.body;
  try {
    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      return res.status(404).json({ message: "Posts not found" });
    }

    const newComment = new Comment({
      userId : user._id,
      postId : post_id,
      comment : comment_body
    });
    await newComment.save();
    return res.status(200).json({message : "comment Added"})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getCommentsByPost = async (req, res) => {
  const {post_id} = req.query;

  try {
    const post = await Post.findOne({_id : post_id});
    if(!post){
      return res.stauts(404).json({message:"Post not found"});
    }

    const postComments = await Comment.find({postId : post_id}).populate(
      "userId",
      "name username emial profilePicture"
    );
    if(!postComments){
      return res.stauts(404).json({message:"comments not found"});
    }


    return res.json({ comments: postComments.reverse() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  const { token, comment_id} = req.body;
  try {
    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const comment = await Post.findOne({ _id: comment_id });
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    if (comment.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorised Account" });
    }

    await Comment.deleteOne({ _id: comment_id });
    return res.json({ message: "Comment Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const incrementLikes = async(req, res)=>{
  const {post_id} = req.body;
  try{
  
    
    const post = await Post.findOne({_id : post_id});
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    post.likes = post.likes +1;
    await post.save();
    return res.json({message : "Likes incremented"})

  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

