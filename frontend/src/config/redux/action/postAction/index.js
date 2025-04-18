import { clintServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async(_, thunkAPI)=>{
    try{
      const response =await clintServer.get("/get_all_post");
      return thunkAPI.fulfillWithValue(response.data)

    }catch(error){
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const createPost = createAsyncThunk(
  "post/createPost",
  async(userData, thunkAPI)=>{
     const {file, body} = userData;
     try{
       
       const formData = new FormData();
       formData.append('token', localStorage.getItem('token'));
       formData.append('body', body);
       formData.append('media', file);
     

      const response = await clintServer.post("/post", formData, {
        headers:{
          'Content-Type' : "multipart/form-data"
        }
      });

      if(response.status == 200){
        return thunkAPI.fulfillWithValue("Post Uploaded");
      }else{
        return thunkAPI.rejectWithValue("Post not Upload")
      }
     }catch(e){
      return thunkAPI.rejectWithValue(e.response.data)
     }
  }
)

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async(post, thunkAPI)=>{
    try{
      const response = await clintServer.delete("/delete_post", {
        data: {
          token : localStorage.getItem("token"),
          post_id : post.post_id,
        }
      })
      return thunkAPI.fulfillWithValue(response.data)
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const incrementPostLike = createAsyncThunk(
  "post/increment",
  async(post, thunkAPI)=>{
    try{
              
        const response = await clintServer.post("like_increment", {
            post_id : post.post_id
        })
        return thunkAPI.fulfillWithValue(response.data)
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const getAllComments = createAsyncThunk(
  "post/getAllComments",
  async(post, thunkAPI)=>{
    try{
      
      const response = await clintServer.get("/get_comments_by_post", {
        params:{
          post_id : post.post_id,
        }
      })

      
      return thunkAPI.fulfillWithValue({
        comments : response.data,
        post_id : post.post_id
      })
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const postComment =createAsyncThunk(
  "post/postComment",
  async(postData, thunkAPI)=>{
    try{
      const response = await clintServer.post("/create_comment", {
          token : localStorage.getItem("token"),
          post_id : postData.post_id, 
          comment_body : postData.comment_body,
      })
      return thunkAPI.fulfillWithValue(response.data)
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)