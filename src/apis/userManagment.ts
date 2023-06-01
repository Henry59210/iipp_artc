import request from '../../network/fetchAPI'

export type LoginForm = {
    username: string
    password: string
}

export interface UserInfo {
    role: string
    username: string
    userId: string
    [key:string]: any
}

export function login(data: LoginForm){
    return request<string>({ //string指返回的data中是string
        url: '/auth/login',
        method: 'POST',
        data
    })
}

export function getInfo(){
    return request<UserInfo>({
        url: '/getUserInfo',
        method: 'GET',
    })
}
