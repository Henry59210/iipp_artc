import request from '../utilities/fetchAPI'

export interface LoginForm {
    username: string
    password: string
}
export interface UserInfo {
    token: string
    role: string[]
    username: string
    userid: string
    [key:string]: any
}

export function login(data: LoginForm){
    return request<UserInfo>({
        url: '/login',
        method: 'POST',
        data
    })
}
