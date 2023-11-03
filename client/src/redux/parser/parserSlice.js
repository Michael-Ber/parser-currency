import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currency: {
        old: '',
        current: ''
    },
    oil: {
        old: '',
        current: ''
    },
    messageCurrency: '',
    messageOil: '',
    errorOil: '',
    firstLoad: true
};

const URL = 'http://localhost:3002'

export const getCurrency = createAsyncThunk(
    'currency/getCurrency',
    async () => {
        try {
            const res = await fetch(`${URL}/currency`);
            const resJSON = res.json();
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
            return resJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

const parserSlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        firstLoadFinish: (state) => { state.firstLoad = false }
    },
    extraReducers: builder => {
        //CURRENCY
        builder.addCase(getCurrency.pending, state => console.log('pending'))
        builder.addCase(getCurrency.fulfilled, (state, action) => {
            if(state.firstLoad) {
                state.currency.old = action.payload.data;
                state.currency.current = action.payload.data;
            }else {
                state.currency.old = state.currency.current;
                state.currency.current = action.payload.data;
            }
            state.messageCurrency = action.payload.message;
        })
        builder.addCase(getCurrency.rejected, () => console.log('rejected'))
        //OIL
        builder.addCase(getOilCost.pending, state => console.log('pending'))
        builder.addCase(getOilCost.fulfilled, (state, action) => {
            if(state.firstLoad) {
                state.oil.old = action.payload.data;
                state.oil.current = action.payload.data;
            }else {
                state.oil.old = state.oil.current;
                state.oil.current = action.payload.data;
            }
            state.messageOil = action.payload.message;
        })
        builder.addCase(getOilCost.rejected, (state, action) => {
            state.error = action.payload.error
        })
    }
});

const { reducer, actions } = parserSlice;
export const { firstLoadFinish } = actions;

export default reducer;