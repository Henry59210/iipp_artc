import {websocketAPI} from "@/network/webSocket";


export type MaterialInventory = {
    createTime: string
    id: string
    materialId: string
    materialName: string
    unreservedWeight: number
    updateTime: string
    updateUser: string
    weight: number
}
export type ProductInventory = {
    createTime: string
    id: string
    productTypeId: string
    productName: string
    unreservedQuantity: number
    updateTime: string
    updateUser: string
    quantity: number
}

export type NotificationType = {
    content: string
    createTime: string
    createUser: string
    id: string
    orderId: string
    readFlag: boolean
    receiverRole:string
    senderRole:string
    updateTime: string
    updateUser: string
}

export function realTimeMaterialInventory() {
    return websocketAPI('/basic/ws/material/0')
}

export function realTimeProductInventory() {
    return websocketAPI('/basic/ws/product/0')
}

export function noticeBarInfo(role: string, token: string | undefined, userId: string) {
    console.log(arguments)
    return websocketAPI(`/${role}/ws/${userId}`, token)
}
