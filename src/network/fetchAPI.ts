import {getToken} from "./auth";
import qs from 'query-string';
import store from '@/store';
import { resetToken } from '@/features/user/userSlice';
/**
 *
 * options= {
 *      url: 'xxx',
 *      method: 'xxx',
 *      header: {xxx:xxx},
 *      body: {xxx:xxx},
 *      param: {xxx:xxx},
 * }
 * @param myOptions
 */
const basicInfo = {
    baseURL: '/api/v1',
    timeout: 5000
}

export default async function fetchApi<T>(myOptions: FetchOptions): Promise<FetchResponse<T>> {
    let {url, method, headers, data, param} = myOptions;

    //before request
    let defaultHeader: DefaultHeader = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
    if (store.getState().user.token) {
        defaultHeader.Authorization = getToken()
    }
    headers = headers ? {...defaultHeader, ...headers} : {...defaultHeader}

    let opt: Options = {
        method,
        headers,
    }
    if (param) {
        url += `${url.includes('?') ? '&' : '?'}${typeof param === 'object' ? qs.stringify(param) : param}`;
    }
    if (data) {
        opt.body = typeof data === 'object' ? JSON.stringify(data) : data
    }
    //request start
    try {
        const response = await fetch(basicInfo.baseURL + url, opt);
        //request finish
        const res = await response.json();
        if (res.code !== '200') {
            if (res.code === '401'){
                new Promise(()=>{
                    store.dispatch(resetToken())
                }).then(()=>{
                    window.location.reload();
                })
            }
            //错误处理
            else return Promise.reject(new Error(res.message || 'Error'))
        }
        return res;
    } catch (error) {
        return {data: null, code: "", msg: "", error: (error as Error).message || 'Fetch error'};
    }
}

interface Options extends RequestInit {
    param?: { [key: string]: any } | string;
}

interface FetchOptions extends Options {
    url: string;
    data?: Record<string, any> | string;
}

interface FetchResponse<T> {
    data: T | null;
    msg: string;
    code: string;
    error?: string;
}

interface DefaultHeader {
    'Content-Type': string
    Accept: string
    Authorization?: string
}

