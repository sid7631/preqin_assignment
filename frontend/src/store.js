import { configureStore } from '@reduxjs/toolkit';
import investorsReducer from './slices/investorsSlice';

export default configureStore({
    reducer: {
        investors: investorsReducer
    }
});