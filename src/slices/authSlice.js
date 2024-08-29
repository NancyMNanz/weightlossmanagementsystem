import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { email } = action.payload;
      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (!Array.isArray(users)) {
        users = [];
      }
      let user = users.find(u => u.email === email);

      if (!user) {
        user = { id: Date.now(), email };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
      }

      state.user = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
