import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    username: ''
}

const FormSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        submit: (state, action) => {
            state.name = action.payload.name
            state.username = action.payload.username
        }
    }
})

export const { submit } = FormSlice.actions;
export default FormSlice.reducer;