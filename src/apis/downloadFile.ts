import request, {basicInfo} from "@/network/fetchAPI";
import {OrderDetail} from "@/apis/order";
import {getToken} from "@/network/auth";

export async function downLoadProductInventory() {
    const response = await fetch(basicInfo.baseURL + '/commercial/file/product/download-inventory', {
        method: 'GET',
        headers: {Authorization: getToken()!}
    })
    const res = response.blob().then((blob) => {
        saveBlobAs(blob, 'product_Inventory.xls')
    })
    return res
}

export async function downLoadMaterialInventory() {
    const res = await fetch(basicInfo.baseURL + '/commercial/file/material/download-inventory', {
        method: 'GET',
        headers: {Authorization: getToken()!}
    })
    const res1 = res.blob().then((blob) => {
        saveBlobAs(blob, 'material_Inventory.xls')
    })
    return res1
}
function saveBlobAs(blob: any, filename: any) {
    if ((window.navigator as any).msSaveOrOpenBlob) {
        (navigator as any).msSaveBlob(blob, filename)
    } else {
        const anchor = document.createElement('a')
        const body = document.querySelector('body')
        anchor.href = window.URL.createObjectURL(blob)
        anchor.download = filename
        anchor.style.display = 'none'
        body!.appendChild(anchor)
        anchor.click()
        body!.removeChild(anchor)
        window.URL.revokeObjectURL(anchor.href)
    }
}
