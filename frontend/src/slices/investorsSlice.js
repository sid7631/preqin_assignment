/**
 * This module contains the Redux slice for managing investors data.
 * @module investorsSlice
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInvestors } from '../api';

/**
 * Async thunk action creator for fetching investors data.
 * @function fetchInvestors
 * @returns {Promise<Array>} A promise that resolves to an array of investors data.
 */
export const fetchInvestors = createAsyncThunk('investors/fetchInvestors', async () => {
    const response = await getInvestors();
    return response.data;
});

/**
 * Redux slice for managing investors data.
 * @type {Slice}
 */
const investorsSlice = createSlice({
    name: 'investors',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInvestors.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export default investorsSlice.reducer;