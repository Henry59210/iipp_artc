import {getToken} from "../network/auth";
import {getInfoAsync, selectHasUserInfo, selectRole, selectUserId} from "@/features/user/userSlice";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {useRouter} from "next/router";
import {ReactNode, useEffect, useState} from "react";
import NProgress from '@/utilities/mynprogress.js'
import {Loading} from "@/components/Global/Loading";
import {chooseForm} from "./urlForm";


const whiteList = ['/login']
export const Permission = ({children}:{children:ReactNode})=>{
    const dispatch = useAppDispatch()
    const router = useRouter()
    const hasUserInfo = useAppSelector(selectHasUserInfo)
    const role = useAppSelector(selectRole)
    const hasToken = getToken();
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        let time = 0
        const handleRouteChange = async () => {
            NProgress.start();
            if (hasToken) {
                if(router.pathname==='/login'){
                    await router.push('/dashboard')
                    NProgress.done()
                } else {
                    if(hasUserInfo) {
                        const urlSet = new Set(Object.values(chooseForm(role)));
                        if(urlSet.has(router.asPath)) {
                            setAuthorized(true)
                            NProgress.done()
                        } else {
                            await router.replace('/404')
                            NProgress.done()
                        }
                    } else {
                        await dispatch(getInfoAsync());
                        setAuthorized(true)
                        NProgress.done()
                    }
                }
            } else {
                if (whiteList.indexOf(router.pathname) === -1 ) {
                    router.push('/login').then(NProgress.done());
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
    }, [hasToken]);

    return authorized ? <>{children}</> : <Loading/>;
}
