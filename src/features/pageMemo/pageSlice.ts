import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@/store";

export type WorkbenchTabs = 'purchase' | 'production' | 'shipment'
export type unConfirmedOrderTabs = 'order' | 'forecast'

export interface PageState {
    workbenchCurrent: WorkbenchTabs
    unconfirmedOrderCurrent: unConfirmedOrderTabs
}

const getDefaultState:()=>PageState =() => {
    return {
        workbenchCurrent: 'purchase',
        unconfirmedOrderCurrent: 'order'
    }
}

const initialState: PageState = getDefaultState()

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setLastWorkbenchTab: (state, action: PayloadAction<WorkbenchTabs>)=>{
            state.workbenchCurrent = action.payload
        },
        setLastUnconfirmedOrderTab: (state, action: PayloadAction<unConfirmedOrderTabs>)=>{
            state.unconfirmedOrderCurrent = action.payload
        }
    }
})
//export actions, will be used in dispatch
export const {setLastWorkbenchTab, setLastUnconfirmedOrderTab} = pageSlice.actions

//get param in state
export const selectWorkbenchCurrent = (state: AppState) => state.page.workbenchCurrent

export const selectUnconfirmedOrderCurrent = (state: AppState) => state.page.unconfirmedOrderCurrent


export default pageSlice.reducer
