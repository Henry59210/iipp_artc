import request from '../network/fetchAPI'

export type LoginForm = {
    username: string
    password: string
}

export interface UserInfo {
    role: string
    username: string
    id: string
    [key:string]: any
}

export function login(data: LoginForm){
    return request<{ token: string, userId: string }>({ //string指返回的data中是string
        url: '/auth/login',
        method: 'POST',
        data
    })
}

export function getInfo(){
    return request<UserInfo>({
        url: '/basic/info',
        method: 'GET',
    })
}

export function logOut(){
    return request({
        url: '/auth/logout',
        method: 'POST',
    })
}
