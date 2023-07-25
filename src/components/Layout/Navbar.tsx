import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import type {MenuProps} from 'antd';
import {Avatar, Badge, Button, ConfigProvider, Drawer, Menu} from 'antd';
import {useRouter} from "next/router";
import {
    loginAsync,
    logoutAsync,
    selectRole,
    selectUrlForm,
    selectUserId,
    selectUsername
} from "@/features/user/userSlice";
import {useAppDispatch, useAppSelector} from "@/hooks";
import styles from "./styles.module.css"
import Image from 'next/image'
import dashboard from "@/pages/dashboard";
import {
    BellFilled
} from '@ant-design/icons';
import {NoticeBar} from "@/components/Layout/NoticeBar";
import {reset} from "@/features/pageMemo/pageSlice";
import {noticeBarInfo, NotificationType} from "@/apis/socketApis";
import {getToken} from "@/network/auth";


const NavBar = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [current, setCurrent] = useState('dashboard')
    const urlForm = useAppSelector(selectUrlForm)
    const [notificationArr, setNotificationArr] = useState<Array<NotificationType>>([])
    const role = useAppSelector(selectRole)
    const userId = useAppSelector(selectUserId)
    const token = getToken()

    const closeCallBack = (data:any) => {
        setNotificationArr(data)
    }

    useEffect(()=>{
        setCurrent(Object.entries(urlForm).find(([key, value]) => value === router.asPath)?.[0] !)
    }, [urlForm])

    useEffect(()=>{
        if(role !== '' && userId !== '' &&  token!== '') {
            const noticeBarSocket = noticeBarInfo(role, token, userId)
            noticeBarSocket.initWebSocket(closeCallBack)
        }
    },[role, userId, token])

    const items: MenuProps['items'] = []

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    for (let i in urlForm) {
        items.push({
            label: i.slice(0, 1).toUpperCase() + i.slice(1).toLowerCase(),
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
                <div className={styles.navbar_item__brand} onClick={() => {
                    router.push('/dashboard');
                    setCurrent('dashboard')
                }}>
                    <Image src='/OFI_logo.png' alt='logo' width={80} height={80}/>
                </div>
                <Menu className={styles.navbar_item__menu} style={{minWidth: 500}} onClick={onClick}
                      selectedKeys={[current]} mode="horizontal" items={items}></Menu>
                <div className={styles.navbar_item__userinfo}>
                    <UserBar showNoticeBar={showDrawer} count={notificationArr.length}/>
                </div>
            </div>
            <Drawer title="Information"
                    width={320}
                    destroyOnClose={false}
                    headerStyle={{'background': 'var(--back-color_navbar)', 'color': 'white'}}
                    bodyStyle={{'padding': '0'}} placement="right" onClose={onClose} open={open}>
                <NoticeBar infoArr={notificationArr}/>
            </Drawer>
        </>

    );
};

export default NavBar;

const UserBar = (props: {showNoticeBar: any, count: number}) => {
    const role = useAppSelector(selectRole)
    const userName = useAppSelector(selectUsername)
    const dispatch = useAppDispatch()
    const logout = async () => {
        dispatch(reset())//reset current tab
        await dispatch(logoutAsync())
    }
    return (
        <div className={styles.userbar}>
            <div className={styles.userbar_notification}>
                <Badge count={props.count}>
                    <BellFilled className={styles.userbar_notification__icon} onClick={props.showNoticeBar}/>
                </Badge>
            </div>
            <div className={styles.userbar_item}>
                {/*<Avatar shape="square" size={56} icon={<UserOutlined />} />*/}
                <Avatar size={64} style={{backgroundColor: '#fde3cf', color: '#f56a00'}}>{userName}</Avatar>
            </div>
            <div className={styles.userbar_item}>
                <div className={styles.userbar_item__info}>{role}</div>
                <div className={styles.userbar_item__operate}>
                    <Button type="link" size={"small"} style={{color: '#F78C2A'}} onClick={logout}>Logout</Button>
                </div>
            </div>
        </div>
    )
}

// export const getLayout = (page: ReactElement) => <NavBar>{page}</NavBar>

