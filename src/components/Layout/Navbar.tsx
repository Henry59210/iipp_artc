import React, {ReactElement, ReactNode, useState} from "react";
import type { MenuProps } from 'antd';
import {Avatar, Button, ConfigProvider, Menu} from 'antd';
import {useRouter} from "next/router";
import {selectRole, selectUrlForm} from "@/features/user/userSlice";
import {useAppSelector} from "@/hooks";
import styles from "./styles.module.css"
import {UserOutlined} from "@ant-design/icons";
import Image from 'next/image'
import dashboard from "@/pages/dashboard";

const NavBar = () => {
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
            <div className={styles.navbar}>
                <div className={styles.navbar_item__brand} onClick={()=>{router.push('/dashboard');setCurrent('dashboard')}}>
                    <Image src='/OFI_logo.png' alt='logo' width={80} height={80}/>
                </div>
                <Menu className={styles.navbar_item__menu} style={{minWidth: 500}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}></Menu>
                <div className={styles.navbar_item__userinfo}>
                    <UserBar/>
                </div>
            </div>
    );
};

export default NavBar;

const UserBar = () => {
    const role = useAppSelector(selectRole)
    const [isHovered, setIsHovered] = useState(false); // 初始状态为非悬停
    const logout = ()=>{
        console.log(this)
    }
    const handleMouseEnter = () => {
        setIsHovered(true); // 设置状态为悬停
    };

    const handleMouseLeave = () => {
        setIsHovered(false); // 设置状态为非悬停
    };
    return (
        <div className={styles.userbar}>
            <div className={styles.userbar_item}>
                {/*<Avatar shape="square" size={56} icon={<UserOutlined />} />*/}
                <Avatar size={64} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{role}</Avatar>
            </div>
            <div className={styles.userbar_item}>
                <div className={styles.userbar_item__info}>{role}</div>
                <div className={styles.userbar_item__operate}>
                    <Button type="link" size={"small"} style={{ color: '#F78C2A' }} onClick={logout}>Logout</Button>
                </div>
            </div>
        </div>
    )
}

// export const getLayout = (page: ReactElement) => <NavBar>{page}</NavBar>

