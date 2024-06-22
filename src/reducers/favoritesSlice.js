import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    return serializedFavorites ? JSON.parse(serializedFavorites) : [];
  } catch (e) {
    console.error("Could not load favorites from local storage", e);
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    const serializedFavorites = JSON.stringify(favorites);
    localStorage.setItem('favorites', serializedFavorites);
  } catch (e) {
    console.error("Could not save favorites to local storage", e);
  }
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(),
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
      saveFavorites(state);
    },
    removeFavorite: (state, action) => {
      const newState = state.filter(article => article.title !== action.payload.title);
      saveFavorites(newState);
      return newState;
    },
  },
});

export default favoritesSlice.reducer;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

