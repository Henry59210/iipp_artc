export type OrderStatus =
    "New Order" |
    "Pending RM Purchase " |
    "Pending Notify Prod" |
    "Pending Prod Confirm" |
    "Production Confirmed" |
    "Production Notify Shipment" |
    "Pending Shipment Confirm" |
    "Shipment Confirmed" |
    "Shipment Arranged" |
    "Shipped" |
    "Order Completed"

export const orderStatus = [
    {value: "New Order", label: "New Order", order: 1},
    {value: "Pending RM Purchase", label: "Pending RM Purchase", order: 2},
    {value: "Pending Notify Prod", label: "Pending Notify Prod", order: 3},
    {value: "Pending Prod Confirm", label: "Pending Prod Confirm", order: 4},
    {value: "Production Confirmed", label: "Production Confirmed", order: 5},
    {value: "Production Finished", label: "Production Finished", order: 6},
    {value: "Pending Shipment Confirm", label: "Pending Shipment Confirm", order: 7},
    {value: "Shipment Confirmed", label: "Shipment Confirmed", order: 8},
    {value: "Shipment Arranged", label: "Shipment Arranged", order: 9},
    {value: "Shipped", label: "Shipped", order: 10},
    {value: "Order Completed", label: "Order Completed", order: 11}
]

export const statusOrderList:{[key:string]: number} = {
    "New Order": 0,
    "Pending RM Purchase": 1,
    "Pending Notify Prod": 2,
    "Pending Prod Confirm": 3,
    "Production Confirmed": 4,
    "Production Finished": 5,
    "Pending Shipment Confirm": 6,
    "Shipment Confirmed": 7,
    "Shipment Arranged": 8,
    "Shipped": 9,
    "Order Completed": 10,
}
