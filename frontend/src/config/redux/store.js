import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer/index"
import postReducer from "./reducer/postReducer/index"

// Steps for State management 
// Submit Action
// handle action in it's reducer 
// Register her -> Reducer



export const store = configureStore({
  reducer : {
    auth : authReducer,
    postReducer : postReducer
  }
});

