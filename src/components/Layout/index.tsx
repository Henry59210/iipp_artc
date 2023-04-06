import React, {ReactNode, useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from "next/link";
import {router} from "next/client";
import {useRouter} from "next/router";

const items: MenuProps['items'] = [
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
    },
    {
        label: (
            <Link href="./pageA">
        Navigation Four - Link
            </Link>
),
key: 'alipay',
},
];

const NavBar= ({children}:{children:ReactNode}) => {
    const [current, setCurrent] = useState('mail');
    const router = useRouter()

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        let url = e.key==='app' ? '/pageA' : e.key==='mail' ? '/login' : '/'
        router.push(url).then(()=>{setCurrent(e.key)})
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
            <div>{children}</div>
        </>
    );
};

export default NavBar;
