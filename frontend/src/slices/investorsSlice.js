import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInvestors } from '../api';

export const fetchInvestors = createAsyncThunk('investors/fetchInvestors', async () => {
    const response = await getInvestors();
    return response.data;
});

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