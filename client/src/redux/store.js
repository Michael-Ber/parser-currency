import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import parserSlice from './parser/parserSlice';

const store = configureStore({
    reducer: { authSlice, parserSlice }
});

export default store;