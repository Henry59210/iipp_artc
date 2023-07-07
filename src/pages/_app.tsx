import '../styles/globals.css'

import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'

import store from '../store'
import {NextPage} from "next";
import React, {ReactElement, ReactNode} from "react";
import {Permission} from "../authenticate/permission";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <Provider store={store}>
            {getLayout(<Permission>
                <Component {...pageProps} />
            </Permission>)}
        </Provider>
    )
}


