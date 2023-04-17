import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getToken, removeToken, setToken} from "../../utilities/auth";
import {login, LoginForm, UserInfo} from "../../apis/userManagment";
import {AppState} from "../../store";
import {chooseForm, UrlCollection} from "../../utilities/urlForm";

export interface UserState {
    token: string | undefined
    role: string
    username: string
    userId: string
    urlForm: UrlCollection
    hasUserInfo: boolean
}

const getDefaultState:()=>UserState =() => {
    return {
        token: getToken(),
        role: '',
        username: '',
        userId: '',
        urlForm: {},
        hasUserInfo: false
    }
}

const initialState: UserState = getDefaultState()

export const loginAsync = createAsyncThunk(
    'user/login',
    async (userInfo: LoginForm) => {
        // const response = await login(userInfo)
        // return response.data
        const data = 'userToken'
        return data
    }
)

export const getInfoAsync = createAsyncThunk(
    'user/getInfo',
    async () => {
        // const response = await getInfo()
        // return response.data
        const data:UserInfo = {
            role: 'commercial',
            username: 'commercial',
            userId: '0001'
        }
        data.urlForm = chooseForm(data.role)
        return data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        resetToken: (state, action: PayloadAction<UserInfo> ) => {
            removeToken() // must remove  token  first
            getDefaultState()
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                    state.token = action.payload
                    setToken(<string>action.payload)
            })
            .addCase(getInfoAsync.fulfilled, (state, action) =>{
                const { role, username, userId, urlForm } = action.payload;
                state.role = role;
                state.username = username;
                state.userId = userId;
                state.urlForm = urlForm;
                state.hasUserInfo = true
            })
    },
})

export const {resetToken} = userSlice.actions

export const selectToken = (state: AppState) => state.user.token
export const selectRole = (state: AppState) => state.user.role
export const selectUsername = (state: AppState) => state.user.username
export const selectUserid = (state: AppState) => state.user.userId
export const selectUrlForm = (state: AppState) => state.user.urlForm
export const selectHasUserInfo = (state: AppState) => state.user.hasUserInfo


export default userSlice.reducer
