import styles from "@/components/Global/styles.module.css";
import React from "react";

export const dateConvert = (originDate: string | Date | number, formate?: Array<string>) => {
    const date = new Date(originDate)
    let result: string = ''
    const checkForm: { [key: string]: number } = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDate(),
        hh: date.getHours(),      //时
        mm: date.getMinutes(),    //分
        ss: date.getSeconds(),    //秒
        ww: date.getDay() //星期
    }
    if (formate) {
        for (let i = 0; i < formate.length; i++) {
            result += i % 2 === 0 ? checkForm[formate[i]].toString() : formate[i]
        }
    } else result = `${checkForm.YYYY}-${checkForm.MM}-${checkForm.DD}-${checkForm.hh}:${checkForm.mm}:${checkForm.ss}`
    return result
}

export const productFormatConvert = (productName: string) => {
    return {
        mainName: !productName ? 'wrong':productName.split(' ').slice(0, 3).join(' '),
        specification: !productName ? 'wrong' : productName.split(' ').slice(3).join(' ')
    }

}

export const deepEqual = (a: any,b: any) => {
    if(a instanceof Object && b instanceof Object ) {
        for(let i in a) {
            if(b[i] === undefined) return false
            else if(!deepEqual(a[i], b[i])) return false
        }
    } else return a===b
    return true
}
