import NavBar from "@/components/Layout/Navbar";
import {ReactElement, ReactNode} from "react";
import {NoticeBar} from "@/components/Layout/NoticeBar";
import styles from "./styles.module.css"
import {ConfigProvider} from "antd";

export const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className={styles.layout}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F78C2A',
                    }
                }}
            >
            <NavBar/>
            <div className={styles.container}>{children}</div>
            </ConfigProvider>
        </div>
    )
}

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>
