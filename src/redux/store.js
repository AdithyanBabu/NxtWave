import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './listsSlice';

const store = configureStore({
  reducer: {
    lists: listsReducer
  }
});

export default store;