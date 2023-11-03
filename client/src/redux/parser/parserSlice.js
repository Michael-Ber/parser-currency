import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currency: '',
    oil: '',
    messageCurrency: '',
    messageOil: ''
};

const URL = 'http://localhost:3002'

export const getCurrency = createAsyncThunk(
    'currency/getCurrency',
    async () => {
        try {
            const res = await fetch(`${URL}/currency`);
            const resJSON = res.json();
            console.log(resJSON);
            return resJSON;
        } catch (error) {
            console.log(error)
        }
    }
);
export const getOilCost = createAsyncThunk(
    'currency/getOilCost',
    async () => {
        try {
            const res = await fetch(`${URL}/oil`);
            const resJSON = res.json();
            console.log(resJSON);
            return resJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

const parserSlice = createSlice({
    name: "currency",
    initialState,
    reducers: {},
    extraReducers: builder => {
        //CURRENCY
        builder.addCase(getCurrency.pending, state => console.log('pending'))
        builder.addCase(getCurrency.fulfilled, (state, action) => {
            state.currency = action.payload.data;
            state.messageCurrency = action.payload.message;
        })
        builder.addCase(getCurrency.rejected, () => console.log('rejected'))
        //OIL
        builder.addCase(getOilCost.pending, state => console.log('pending'))
        builder.addCase(getOilCost.fulfilled, (state, action) => {
            state.oil = action.payload.data;
            state.messageOil = action.payload.message;
        })
        builder.addCase(getOilCost.rejected, () => console.log('rejected'))
    }
});

const { reducer, actions } = parserSlice;

export default reducer;