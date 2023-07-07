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

export function realTimeMaterialInventory() {
    return websocketAPI('/basic/ws/material/0')
}

export function realTimeProductInventory() {
    return websocketAPI('/basic/ws/product/0')

}
