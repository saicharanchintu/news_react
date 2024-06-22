import { createSlice } from '@reduxjs/toolkit';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    list: [],
  },
  reducers: {
    setArticles: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
