import {getToken} from "./auth";
import {getInfoAsync, selectHasUserInfo, selectRole} from "../features/user/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useRouter} from "next/router";
import {ReactNode, useEffect, useState} from "react";
import NProgress from './mynprogress.js'
import {Spin} from "antd";
import {Loading} from "@/components/Layout/Loading";


const whiteList = ['/login']
export const Permission = ({children}:{children:ReactNode})=>{
    const hasToken = getToken();
    const dispatch = useAppDispatch()
    const router = useRouter()
    const hasUserInfo = useAppSelector(selectHasUserInfo)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        let time = 0
        const handleRouteChange = async () => {
            NProgress.start();
            console.log('abc')
            if (hasToken) {
                if(router.pathname==='/login'){
                    await router.push('/dashboard')
                    NProgress.done()
                } else {
                    if(hasUserInfo) {
                        setAuthorized(true)
                        console.log('aaa')
                        NProgress.done()
                    } else {
                        await dispatch(getInfoAsync());
                        setAuthorized(true)
                        NProgress.done()
                    }
                }
            } else {
                console.log('bb')
                if (whiteList.indexOf(router.pathname) === -1 ) {
                    router.push('/login').then(NProgress.done());
                    console.log('ccc')
                } else {
                    setAuthorized(true)
                    NProgress.done()
                }
            }
        };
        void handleRouteChange()

        const preventAccess = () => setAuthorized(false);

        router.events.on('routeChangeStart', preventAccess);
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', preventAccess);
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [hasToken, router, dispatch]);

    return authorized ? <>{children}</> : (<Loading/>);
}
