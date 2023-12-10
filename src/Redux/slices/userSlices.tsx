import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  userName: string | null;
  photo: string | null;
  email: string | null;
  id: string | null;
  mac: string | null;
  coin: number;
  coin_id: string | null;
}

const initialState: UserState = {
  userName: null,
  photo: null,
  email: null,
  id: null,
  mac: null,
  coin: 0,
  coin_id: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ADD_USER: (state, action: PayloadAction<UserState>) => {
      state.userName = action.payload.userName;
      state.photo = action.payload.photo;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.mac = action.payload.mac;
      state.coin = action.payload.coin;
      state.coin_id = action.payload.coin_id;
    },
    REMOVE_USER: state => {
      state.userName = null;
      state.photo = null;
      state.email = null;
      state.id = null;
      state.coin = 0;
      state.coin_id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {ADD_USER, REMOVE_USER} = userSlice.actions;

export default userSlice.reducer;
