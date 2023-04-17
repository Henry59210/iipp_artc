export type UrlCollection = {
    [ket:string] : string
}

export const role = {
    employee: ['commercial', 'production', 'shipment'],
    external: ['customer']
}

const commercialForm: UrlCollection = {
    dashboard: '/dashboard',
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
