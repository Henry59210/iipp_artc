

export const dateConvert = (originDate: string | Date, formate?:Array<string>) => {
    const date = new Date(originDate)
    let result:string = ''
    const checkForm: {[key:string]:number} = {
        YYYY: date.getFullYear(),
        MM: date.getMonth()+1,
        DD: date.getDate(),
        hh: date.getHours(),      //时
        mm: date.getMinutes(),    //分
        ss: date.getSeconds(),    //秒
        ww: date.getDay() //星期
    }
    if(formate) {
        for(let i = 0; i< formate.length; i++) {
            result += i%2 === 0 ? checkForm[formate[i]].toString(): formate[i]
        }
    }else result = `${checkForm.YYYY}-${checkForm.MM}-${checkForm.DD}-${checkForm.hh}:${checkForm.mm}:${checkForm.ss}`
    return result
}
