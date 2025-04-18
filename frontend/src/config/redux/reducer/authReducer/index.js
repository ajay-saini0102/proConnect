import { getAboutUser, getAllUser, getConnectionRequest, getMyConnectionRequest, loginUser, registerUser } from "../../action/authAction";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  isToken : false,
  message : "",
  profileFetched: false,                
  connections: [],
  connectionRequest: [],
  all_profiles : [],
  all_profile_fetched : false,

};
const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "";
    },
    emptyMessage : (state)=>{
      state.message = "";
    },
    setTokenIs : (state) =>{
      state.isToken = true;
    },
    setNotTokenIs :  (state) =>{
      state.isToken = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = {message : "Knocking The Door...."};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = {message : "Login is Successfull"};
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Registering you...."
      }).addCase(registerUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = {
          message :"Registration is Successfull, Please LogIn "}
      })
      .addCase(registerUser.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
      })
      .addCase(getAboutUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isError = false;
        state.profileFetched = true;
        state.user = action.payload
      })
      .addCase(getAllUser.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isError = false;
        state.all_profile_fetched = true;
        state.all_profiles = action.payload.profiles;
      }).addCase(getConnectionRequest.fulfilled, (state, action)=>{
        state.connections = action.payload
      }).addCase(getConnectionRequest.rejected, (state, action)=>{
        state.message = action.payload
      }).addCase(getMyConnectionRequest.fulfilled, (state, action)=>{
        state.connectionRequest = action.payload
      }).addCase(getMyConnectionRequest.rejected, (state, action)=>{
        state.message = action.payload
      })
  },
});

export const {reset, handleLoginUser, emptyMessage, setNotTokenIs, setTokenIs} = authSilce.actions;
export default authSilce.reducer;
