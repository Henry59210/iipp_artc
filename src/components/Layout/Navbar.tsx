import React, {ReactElement, ReactNode, useState} from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useRouter} from "next/router";
import {selectRole} from "../../features/user/userSlice";

const items: MenuProps['items'] = [
    {
        label: 'DashBoard',
        key: 'DashBoard',
        icon: <MailOutlined />,
    },
    {
        label: 'WorkBench',
        key: 'WorkBench',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Order',
        key: 'order',
        icon: <AppstoreOutlined />,
    },
];

const NavBar = ({children}:{children:ReactNode}) => {
    const [current, setCurrent] = useState('PageB');
    const router = useRouter();


    const onClick: MenuProps['onClick'] = (e) => {

        // router.push(url).then(()=>{setCurrent(e.key)})
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
            <div>{children}</div>
        </>
    );
};


export default NavBar;

export const getLayout = (page: ReactElement) => <NavBar>{page}</NavBar>
