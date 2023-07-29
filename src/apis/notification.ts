import request from "@/network/fetchAPI";

export function readMessage(data: string[], role: string){
    return request<string>({ //string指返回的data中是string
        url: `/${role}/message/read-message`,
        method: 'POST',
        data
    })
}
