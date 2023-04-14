type UrlCollection = {
    [ket:string] : string
}

export const role = {
    employee: ['commercial', 'production', 'shipment'],
    external: ['customer']
}

const commercialForm: UrlCollection = {
    dashboard: '/dashboard/employee',
    workbench: '/workbench/commercial',
    order: '/workbench/employee'
}
const productionForm: UrlCollection = {
    dashboard: '/dashboard/employee',
    workbench: '/workbench/production',
    order: '/workbench/employee'
}
const shipmentForm: UrlCollection = {
    dashboard: '/dashboard/employee',
    workbench: '/workbench/shipment',
    order: '/workbench/employee'
}
const customerForm: UrlCollection = {
    dashboard: '/dashboard/customer',
    workbench: '/workbench/commercial',
    order: '/workbench/customer'
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
