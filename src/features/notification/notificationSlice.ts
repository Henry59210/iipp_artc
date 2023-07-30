import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@/store";

const getDefaultState:()=> { readList : {[key: string]: boolean}, isUpdate: boolean } = () => {
    return {
        readList: {},
        isUpdate: false,
    }
}
const initialState: { readList : {[key: string]: boolean}, isUpdate: boolean } = getDefaultState()

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
        setUpdate: (state, action: PayloadAction<boolean>) => {
            state.isUpdate = action.payload
        }
    }
})
//export actions, will be used in dispatch
export const {reset, setRead, removeHandled, setUpdate} = notificationSlice.actions

//get param in state
export const selectReadList = (state: AppState) => state.notification.readList
export const selectIsUpdate = (state: AppState) => state.notification.isUpdate

export default notificationSlice.reducer
