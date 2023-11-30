import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../constants/base_urls';

const initialState = {
  _id: '',
  name: '',
  given_name: '',
  family_name: '',
  email: '',
  picture: '',
  quote: '',
  isAdmin: false,
  artist: {},
};

export const signIn = createAsyncThunk('user/signin', async (userId) => {
  console.log(userId)
  const response = await axios.post(`${baseUrl}user/login`, { oauthCode: userId });
  return response.data;
});

export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  const response = await axios.get(`${baseUrl}user/user/${userId}`);
  return response.data;
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state._id = action.payload.user._id;
        state.given_name = action.payload.user.name;
        state.given_name = action.payload.user.given_name;
        state.family_name = action.payload.user.family_name;
        state.isAdmin = action.payload.user.isAdmin;
        state.email = action.payload.user.email;
        state.picture = action.payload.user.picture;
        state.artist = action.payload.user.artist;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state._id = action.payload.user._id;
        state.given_name = action.payload.user.name;
        state.given_name = action.payload.user.given_name;
        state.family_name = action.payload.user.family_name;
        state.isAdmin = action.payload.user.isAdmin;
        state.email = action.payload.user.email;
        state.picture = action.payload.user.picture;
        state.artist = action.payload.user.artist;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
