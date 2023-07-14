import request from '../network/fetchAPI'
import {LoginForm} from "@/apis/userManagment";

export type AllHistory = {
    [key:string]: HistoryList
}


export type HistoryList = Array<{
    recordTime: string
    quantities?: number
    weight?: number
}>

export type ProductInventoryInfo = {
    createTime: string,
    createUser: string,
    id: string,
    productName: string,
    productTypeId: string,
    quantity: number,
    unreservedQuantity: number,
    updateTime: string,
    updateUser: string,
}

export type MaterialInventoryInfo = {
    createTime: string,
    id: string,
    materialName: string,
    materialTypeId: string,
    weight: number,
    updateTime: string,
}

export function getAllMaterialCurrentInventory(){
    return request<Array<MaterialInventoryInfo>>({ //string指返回的data中是string
        url: '/basic/material/inventory',
        method: 'GET',
    })
}

export function getCertainMaterialHistory(materialName:string){
    return request<HistoryList>({ //string指返回的data中是string
        url: '/basic/material/history' + materialName,
        method: 'GET',
    })
}

export function getAllMaterialHistory(){
    return request<AllHistory>({ //string指返回的data中是string
        url: '/basic/material/history',
        method: 'GET',
    })
}


export function getCertainProductHistory(productName:string){
    return request<AllHistory>({ //string指返回的data中是string
        url: '/basic/material/history/' + productName,
        method: 'GET',
    })
}

export function getAllProductHistory(){
    return request<AllHistory>({ //string指返回的data中是string
        url: '/basic/product/history',
        method: 'GET',
    })
}

export function getProductInventory() {
    return request<ProductInventoryInfo[]>({
        url: '/basic/product/inventory',
        method: 'GET'
    })
}
