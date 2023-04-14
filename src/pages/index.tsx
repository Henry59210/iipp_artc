import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from "../components/Layout";
import {ParsedUrlQuery} from "querystring";

const IndexPage: NextPage = (props) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Inventory planning platform</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
        </div>
    )
}

export default IndexPage


export const getServerSideProps: GetServerSideProps<{ role: ParsedUrlQuery }> = async (context) => {
    let role = context.query
    return {
        props: {
            role,
        },
    }
}
