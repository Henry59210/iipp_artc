import React, {ReactNode, useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from "next/link";
import {router} from "next/client";
import {useRouter} from "next/router";

const items: MenuProps['items'] = [
    {
        label: (<Link href="./pageA">
            PageA
                </Link>
        ),
        key: 'PageA',
        icon: <MailOutlined />,
    },
    {
        label: 'PageB',
        key: 'PageB',
        icon: <AppstoreOutlined />,
    },
];

const NavBar= ({children}:{children:ReactNode}) => {
    const [current, setCurrent] = useState('mail');
    const router = useRouter()

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        let url = e.key==='PageA' ? '/pageA' : '/'
        router.push(url).then(()=>{setCurrent(e.key)})
    };
    const renderNav= ()=>{
        if(router.pathname === '/login') return null
        else return(
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
        )
    }

    return (
        <>
            {renderNav()}
            <div>{children}</div>
        </>
    );
};

export default NavBar;
