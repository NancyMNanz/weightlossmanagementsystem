import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weights: JSON.parse(localStorage.getItem('weights')) || [],
};

const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {
    addWeight(state, action) {
      const today = new Date().toISOString().split('T')[0];
      const existingWeight = state.weights.find(
        (weight) => weight.date === today && weight.userId === action.payload.userId
      );
      if (existingWeight) {
        throw new Error('Weight for today is already added.');
      }
      state.weights.push(action.payload);
      localStorage.setItem('weights', JSON.stringify(state.weights));
    },
    editWeight(state, action) {
      const index = state.weights.findIndex(
        (weight) => weight.id === action.payload.id && weight.userId === action.payload.userId
      );
      if (index !== -1) {
        state.weights[index] = action.payload;
        localStorage.setItem('weights', JSON.stringify(state.weights));
      }
    },
    deleteWeight(state, action) {
      state.weights = state.weights.filter(
        (weight) => weight.id !== action.payload.id || weight.userId !== action.payload.userId
      );
      localStorage.setItem('weights', JSON.stringify(state.weights));
    },
  },
});

export const { addWeight, editWeight, deleteWeight } = weightSlice.actions;
export default weightSlice.reducer;
