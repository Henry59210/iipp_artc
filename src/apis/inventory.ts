import request from '../../network/fetchAPI'
import {LoginForm} from "@/apis/userManagment";

export type AllHistory = {
    [key:string]: Array<HistoryList>
}


export type HistoryList = Array<{
    recordTime: string
    quantities?: number
    weight?: number
}>

export type ProductInventoryInfo = {
    createTime: string,
    id: string,
    productName: string,
    productTypeId: string,
    quantity: number,
    updateTime: string,
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

export function getSingleMaterialHistory(param:string){
    return request<HistoryList>({ //string指返回的data中是string
        url: '/basic/material/history' + param,
        method: 'Get',
    })
}

export function getAllMaterialHistory(){
    return request<AllHistory>({ //string指返回的data中是string
        url: '/basic/material/history',
        method: 'Get',
    })
}

export function getAllProductCurrentInventory(){
    return request<ProductInventoryInfo>({ //string指返回的data中是string
        url: '/basic/product/inventory',
        method: 'GET',
    })
}

export function getSingleProductHistory(param:string){
    return request<AllHistory>({ //string指返回的data中是string
        url: '/material/history' + param,
        method: 'Get',
    })
}

export function getAllProductHistory(){
    return request<AllHistory>({ //string指返回的data中是string
        url: '/material/history',
        method: 'Get',
    })
}

