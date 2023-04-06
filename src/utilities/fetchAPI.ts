import store from "../store";
import {getToken} from "./auth";
import qs from 'query-string';

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
    baseURL: '',
    timeout: 5000
}

export default async function fetchApi<T>(myOptions: FetchOptions): Promise<FetchResponse<T>> {
    let { url, method, headers, data, param } = myOptions;

    //before request
    let defaultHeader:DefaultHeader = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
    }
    if(store.getState().user.token){
        defaultHeader.User_Token = getToken()
    }
    headers = headers ? {...defaultHeader, ...headers} : headers

    let opt:Options = {
        method,
        headers,
    }
    if(param) {
        url += `${url.includes('?') ? '&' : '?'}${typeof param === 'object' ? qs.stringify(param) : param}`;
    }
    if(data) {
        opt.body = typeof data === 'object' ? JSON.stringify(data) : data
    }
    //request start
    try {
        const response = await fetch(basicInfo.baseURL + url, );
    //request finish
        const res = await response.json();
        if (res.code !== '200') {
            //错误处理
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res;

    } catch (error) {
        return { data: null, error: (error as Error).message || 'Fetch error' };
    }
}

interface Options {
    method: string;
    headers?: Record<string, string>;
    body?: Record<string, any> | string;
    param?: Record<string, any> | string;
}
interface FetchOptions extends Options{
    url: string;
    data?: Record<string, any> | string;
}

interface FetchResponse<T> {
    data: T | null;
    error?: string;
}

interface DefaultHeader {
    'Content-Type': string,
    Accept: string,
    User_Token?: string
}

