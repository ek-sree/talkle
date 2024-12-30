import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  userName: string | null;
  avatar: string | null;
  email: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  userName:null,
  avatar: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id:string; name: string; avatar: string; email: string, userName:string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.userName = action.payload.userName
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearUser: (state) => {
      state.name = null;
      state.avatar = null;
      state.email = null;
    },
  },
});

export const { setUser, updateName,updateUserName, updateAvatar, updateEmail, clearUser } = userSlice.actions;
export default userSlice;
