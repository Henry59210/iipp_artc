import request from "../network/fetchAPI";
import {UserInfo} from "@/apis/userManagment";
import {OrderStatus} from "@/components/Global/statusList";

export type OrderRequest = {
    orderId: string,
    customerDept: string[],
    expectedTimeBegin: string,
    expectedTimeEnd: string,
    orderDateBegin: string,
    orderDateEnd: string,
    status: string[]
}

export type OrderResponse = {
    records: OrderInfo[],
    total: number,
    size: number,
    current: number,
    orders: [],
    pages: number,
    [key: string]: any
}

export type OrderInfo = {
    customerId: string
    customerDept: string
    expectedTime: string
    id: string
    orderDate: string
    productList: Array<ProductInfo>
    status: string,
    orderStatusHistoryList: OrderStatus[]
}

export type ProductInfo = {
    id: string
    productName: string
    quantity: number
}
export type MaterialInfo = {
    materialId: string,
    materialName: string,
    weight: number,
    actualWeightUsed?: number|null
}

export type ProductInventoryItem = {
    inventoryQuantity: number,
    materialList: MaterialInfo[]
    needQuantity: number,
    orderQuantity: number,
    productId: string,
    productName: string
}
export type DemandMaterialListItem = {
    demandWeight: number,
    inventoryWeight: number,
    materialId: string,
    materialName: string,
    purchaseDemand: number
}

export interface OrderDetail extends Omit<OrderInfo, "productList" | "orderStatusHistoryList"> {
    executableState: string
    productDetailList: Array<ProductInventoryItem>
    demandMaterialList: Array<DemandMaterialListItem>
}

export type CombineProductItem = {
    id: string,
    isFinished: boolean,
    productionOrderList: [
        {
            id: string,
            productId: string,
            productName: string,
            quantity: 0
        }
    ]
}

export type productRequiredListItem = {
    id: string,
    productId: string,
    materialRequiredList: MaterialInfo[]
} & Omit<ProductInfo, 'id'>

export type CombineProductOrderDetail = {
    id: string,
    materialRequiredList: MaterialInfo[]
    orderList: OrderInfo[]
    productRequiredList: Array<productRequiredListItem>
}
export interface CombineShipOrderDetail extends Omit<CombineProductOrderDetail, 'materialRequiredList'>{}

export type CombineShipItemOrders = {
    createTime: string,
    createUser: string,
    customerId: string,
    customerDept: string
    expectedTime: string,
    id: string,
    orderDate: string,
    productionOrderId: string,
    shipId: string,
    status: 0,
    updateTime: string,
    updateUser: string
}
export type CombineShipItem = {
    arrivingTime: string,
    carPlate: string,
    id: string,
    leavingTime: string,
    orders: CombineShipItemOrders[]
    startLocation: string
}

export type CombineOrderResponse<T> = {
    countId: string,
    current: number,
    maxLimit: number,
    optimizeCountSql: true,
    orders: [
        {
            asc: true,
            column: string
        }
    ],
    pages: number,
    records: T[],
    searchCount: boolean,
    size: 0,
    total: 0
}

export function getDepartment() {
    return request<string[]>({
        url: '/basic/info/get-dept-list',
        method: 'GET',
    })
}

export function getOrdersForCommercial(data: OrderRequest, role: string, param: { limit?: number, offset?: number }) {
    return request<OrderResponse>({
        url: `/${role}/order/page`,
        method: 'POST',
        data,
        param
    })
}

export function getOrderInventoryDetail(orderId: string, role:string) {
    return request<OrderDetail>({
        url: `/${role}/order/` + orderId,
        method: 'GET'
    })
}

export function confirmOrder(data: OrderDetail) {
    return request<OrderDetail>({
        url: '/commercial/order',
        method: 'PUT',
        data
    })
}
export function packageProductionOrder(data: string[]) {
    return request({
        url: '/commercial/order',
        method: 'POST',
        data
    })
}
export function rollbackProductionOrder(param: string) {
    return request({
        url: '/commercial/production/' + param,
        method: 'DELETE',
    })
}
//还没确认的订单
export function getProductionCombineOrder(param: { limit?: number, offset?: number }) {
    return request<CombineOrderResponse<CombineProductItem>>({
        url: '/commercial/production/page',
        method: 'POST',
        data: {},
        param
    })
}

export function getProductionCombineDetail(combineId: string, role: string) {
    return request<CombineProductOrderDetail>({
        url: `/${role}/production/detail/` + combineId,
        method: 'GET',
    })
}
//还没确认的订单
export function getShipCombineOrder(param: { limit?: number, offset?: number }) {
    return request<CombineOrderResponse<CombineShipItem>>({
        url: '/commercial/ship/page',
        method: 'GET',
        param
    })
}

export function getShipCombineOrderDetail(combineId: string) {
    return request<CombineShipOrderDetail>({
        url: '/commercial/ship/' + combineId,
        method: 'GET',
    })
}
export function packageShipOrder(data: string[]) {
    return request({
        url: '/commercial/ship/submit-order',
        method: 'POST',
        data
    })
}
//For production
//已经确认的订单
export function getProductionOrder(data:{id?: string, isFinished?: boolean}, param: { limit?: number, offset?: number }) {
    return request<CombineOrderResponse<CombineProductItem>>({
        url: '/production/production/page',
        method: 'POST',
        data,
        param
    })
}
export function getExpectedOrderData(param: string) {
    return request<Omit<CombineProductOrderDetail, 'id'|'orderList'>>({
        url: '/production/production/' + param,
        method: 'GET',
    })
}
export function modifyMaterialInventory(data:Array<{materialId: string, productionId:string, weight: number}>) {
    return request<string>({
        url: '/production/inventory/material',
        method: 'PUT',
        data
    })
}

export function finishOrder(data:Array<string>) {
    return request<string>({
        url: '/production/production',
        method: 'PUT',
        data
    })
}
//For Shipment
//已经确认的订单
export function getShipmentOrder( data: { isShipped: boolean }, param: { limit?: number, offset?: number }) {
    return request<CombineOrderResponse<CombineShipItem>>({
        url: '/shipment/ship/page',
        method: 'POST',
        param,
        data
    })
}
