import '../styles/globals.css'

import { Provider } from 'react-redux'
import type {AppProps} from 'next/app'

import store from '../store'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}


