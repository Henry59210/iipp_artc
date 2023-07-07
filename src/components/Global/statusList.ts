export type OrderStatus = "New Order" |
    "Pending RM" |
    "Pending Notify PR" |
    "Pending PR confirmed" |
    "PR confirmed" |
    "Production Finished" |
    "Pending Shipment Confirmed" |
    "Shipment Confirmed" |
    "Shipment Arranged" |
    "Shipped" |
    "Order Completed"

export const orderStatus = [
    {value: "New Order", label: "New Order", order: 1},
    {value: "Pending RM", label: "Pending RM", order: 2},
    {value: "Pending Notify PR", label: "Pending Notify PR", order: 3},
    {value: "Pending PR confirmed", label: "Pending PR confirmed", order: 4},
    {value: "PR confirmed", label: "PR confirmed", order: 5},
    {value: "Production Finished", label: "Production Finished", order: 6},
    {value: "Pending Shipment Confirmed", label: "Pending Shipment Confirmed", order: 7},
    {value: "Shipment Confirmed", label: "Shipment Confirmed", order: 8},
    {value: "Shipment Arranged", label: "Shipment Arranged", order: 9},
    {value: "Shipped", label: "Shipped", order: 10},
    {value: "Order Completed", label: "Order Completed", order: 11}
]

export const statusOrderList = {
    "New Order": 0,
    "Pending RM": 1,
    "Pending Notify PR": 2,
    "Pending PR confirmed": 3,
    "PR confirmed": 4,
    "Production Finished": 5,
    "Pending Shipment Confirmed": 6,
    "Shipment Confirmed": 7,
    "Shipment Arranged": 8,
    "Shipped": 9,
    "Order Completed": 10,
}
