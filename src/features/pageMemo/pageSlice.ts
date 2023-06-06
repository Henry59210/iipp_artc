import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UrlCollection} from "../../../authenticate/urlForm";
import {getToken} from "../../../network/auth";
import {UserInfo} from "@/apis/userManagment";
import {AppState} from "@/store";
import {userSlice} from "@/features/user/userSlice";

export interface PageState {
    current: string
}

const getDefaultState:()=>PageState =() => {
    return {
        current: ''
    }
}

const initialState: PageState = getDefaultState()

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setLastTab: (state, action: PayloadAction<string>)=>{
            state.current = action.payload
        }
    }
})

export const {setLastTab} = pageSlice.actions

export const selectCurrent = (state: AppState) => state.page.current

export default pageSlice.reducer
