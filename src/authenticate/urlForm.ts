export type UrlCollection = {
    [key:string] : string
}

export const role:{[key:string]: string[]} = {
    employee: ['commercial', 'production', 'shipment'],
    external: ['customer']
}

const commercialForm: UrlCollection = {
    dashboard: '/dashboard',
    newOrder: '/newOrder',
    workbench: '/workbench/commercial',
    order: '/order/employee'
}
const productionForm: UrlCollection = {
    dashboard: '/dashboard',
    workbench: '/workbench/production',
    order: '/order/employee'
}
const shipmentForm: UrlCollection = {
    dashboard: '/dashboard',
    workbench: '/workbench/shipment',
    order: '/order/employee'
}
const customerForm: UrlCollection = {
    dashboard: '/dashboard',
    shopping: '/shopping',
    order: '/order/customer'
}

export const chooseForm = (role:string)=>{
    const checkForm:{[key:string]:UrlCollection} = {
        commercial: commercialForm,
        production: productionForm,
        shipment: shipmentForm,
        customer: customerForm
    }
    return checkForm[role]
}
