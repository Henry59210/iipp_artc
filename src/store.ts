import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import userReducer from './features/user/userSlice'
import pageReducer from "@/features/pageMemo/pageSlice";
import notificationReducer from "@/features/notification/notificationSlice";


export function makeStore() {
  return configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        page: pageReducer,
        notification: notificationReducer
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
