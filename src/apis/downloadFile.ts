import request, {basicInfo} from "@/network/fetchAPI";
import {OrderDetail} from "@/apis/order";
import {getToken} from "@/network/auth";

export async function downLoadProductInventory() {
    const response = await fetch(basicInfo.baseURL + '/commercial/file/product/download-inventory', {
        method: 'GET',
        headers: {Authorization: getToken()!}
    })
    const fileName = response.headers.get('content-disposition')!.split('filename=')[1]

    const res = response.blob().then((blob) => {
        saveBlobAs(blob, `${fileName}.xls`)
    })
    return res
}

export async function downLoadMaterialInventory() {
    const response = await fetch(basicInfo.baseURL + '/commercial/file/material/download-inventory', {
        method: 'GET',
        headers: {Authorization: getToken()!}
    })
    const fileName = response.headers.get('content-disposition')!.split('filename=')[1]

    const res = response.blob().then((blob) => {
        saveBlobAs(blob, `${fileName}.xls`)
    })
    return res
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
