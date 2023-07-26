import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@/store";

const getDefaultState:()=> { readList : {[key: string]: boolean} } = () => {
    return {
        readList: {}
    }
}
const initialState: { readList : {[key: string]: boolean} } = getDefaultState()

export const notificationSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        reset: () => initialState,
        setRead: (state, action: PayloadAction<string>)=>{
            state.readList[action.payload] = true
        },
        removeHandled:  (state, action: PayloadAction<string>)=>{
            delete state.readList[action.payload]
        },
    }
})
//export actions, will be used in dispatch
export const {reset, setRead, removeHandled} = notificationSlice.actions

//get param in state
export const selectReadList = (state: AppState) => state.notification.readList

export default notificationSlice.reducer
