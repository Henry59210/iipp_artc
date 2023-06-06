type productInfo = {
    id: string
    productName: string
    quantity: number
}

export type OrderInfo = {
    customerId: string
    expectedTime: string
    id: string
    orderDate: string
    productList: Array<productInfo>
    status: string
}
export type productInventoryItem = {
    productName: string,
    orderPkg: number,
    inventoryPkg: number,
    needPkg: number
}
export type materialInventoryItem = {
    materialName: string,
    materialDemand: number,
    materialInventory: number,
    purchaseDemand: number
}
export interface OrderDetail extends Omit<OrderInfo, "productList"> {
    type: string
    productInventoryList: Array<productInventoryItem>
    materialInventoryList: Array<materialInventoryItem>
}
