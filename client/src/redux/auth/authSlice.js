import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    token: '',
    message: ''
};

const URL = 'http://localhost:3002'

export const register = createAsyncThunk(
    'auth/register',
    async (data) => {
        try {
            const res = await fetch(`${URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resJSON = await res.json();
            if (resJSON.token) {
                window.localStorage.setItem('token', resJSON.token);
            }
            return resJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data) => {
        try {
            const res = await fetch(`${URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resJSON = await res.json();
            if (resJSON.token) {
                window.localStorage.setItem('token', resJSON.token);
            }
            return resJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

export const getMe = createAsyncThunk(
    'auth/getMe',
    async () => {
        try {
            const res = await fetch(`${URL}/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            });
            const resJSON = await res.json();
            return resJSON;
        } catch (error) {
            console.log(error)
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = '';
            state.token = '';
            state.message = '';
        }
    },
    extraReducers: builder => {
        //REGISTRATION
        builder.addCase(register.pending, (state, action) => { console.log('pending') })
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.newUser;
            state.token = action.payload.token;
            state.message = action.payload.message
        })
        builder.addCase(register.rejected, (state, action) => { console.log('rejected') })
        //LOGIN
        builder.addCase(login.pending, (state, action) => { console.log('pending') })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.message = action.payload.message;
        })
        builder.addCase(login.rejected, (state, action) => { console.log('rejected') })
        //GETME
        builder.addCase(getMe.pending, (state, action) => { console.log('pending') })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.message = action.payload.message;
        })
        builder.addCase(getMe.rejected, (state, action) => { console.log('rejected') })
    }
});

const { reducer, actions } = authSlice;
export const { logout } = actions;

export default reducer;