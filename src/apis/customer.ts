import request from '../network/fetchAPI'

export type CartItemType = {id: string, productId: string, productName: string, quantity: number}

export function submitItemToShopCart(data:{productId: string, quantity: number}) {
    return request({ //string指返回的data中是string
        url: '/customer/cart',
        method: 'POST',
        data
    })
}

export function getCartList() {
    return request<CartItemType[]>({ //string指返回的data中是string
        url: '/customer/cart',
        method: 'GET',
    })
}

export function updateCart(data:{id: string, quantity:number}[]) {
    return request<CartItemType[]>({ //string指返回的data中是string
        url: '/customer/cart',
        method: 'PUT',
        data
    })
}

export function submitOrder(data:{productList: CartItemType[], expectedTime:string}) {
    return request<CartItemType[]>({ //string指返回的data中是string
        url: '/customer/order',
        method: 'POST',
        data
    })
}
