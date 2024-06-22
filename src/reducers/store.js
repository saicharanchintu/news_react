import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './articleSlice';
import favoritesSlice from './favoritesSlice';


export const store = configureStore({
  reducer: {
    articles: articleSlice,
    favorites: favoritesSlice,
  },
});
