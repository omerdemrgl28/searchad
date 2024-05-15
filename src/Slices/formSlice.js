import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    searchTerm: '', 
  },
  reducers: {
    changeName(state, action) {  
      state.searchTerm = action.payload;
    },  
  },
});

export const { changeName} = formSlice.actions;
export const formReducer = formSlice.reducer;