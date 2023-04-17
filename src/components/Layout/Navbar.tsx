import React, {ReactElement, ReactNode, useState} from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useRouter} from "next/router";
import {selectUrlForm} from "../../features/user/userSlice";
import {useAppSelector} from "../../hooks";
import styles from "./styles.module.css"

const NavBar = ({children}:{children:ReactNode}) => {
    const [current, setCurrent] = useState('dashboard');
    const router = useRouter();
    const urlForm = useAppSelector(selectUrlForm)
    const items:MenuProps['items']  = []
    for (let i in urlForm) {
        items.push({
            label: i.slice(0,1).toUpperCase()+i.slice(1).toLowerCase(),
            key: i
        })
    }
    const onClick: MenuProps['onClick'] = (e) => {
        router.push(urlForm[e.key])
        setCurrent(e.key)
    };

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbar_item__brand}>logo</div>
                <Menu className={styles.navbar_item__menu} style={{minWidth: 500}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
                <div className={styles.navbar_item__userinfo}>aaa</div>
            </div>
            <div>{children}</div>
        </>
    );
};


export default NavBar;

export const getLayout = (page: ReactElement) => <NavBar>{page}</NavBar>
