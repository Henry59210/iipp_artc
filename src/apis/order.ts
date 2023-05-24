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
