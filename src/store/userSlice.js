import { createSlice } from "@reduxjs/toolkit";

const userInformationSlice = createSlice({
    name: "userInfo",
    initialState: { 
        userDetails: {} 
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        }
    }
});

export const { setUserDetails } = userInformationSlice.actions;
export const userInfoReducer =  userInformationSlice.reducer;
