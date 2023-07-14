import styles from './styles.module.css'
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from "antd";
import {loginAsync, selectRole} from "../../features/user/userSlice";
import {useRouter} from 'next/router'
import {LoginForm} from "../../apis/userManagment";
import {useAppDispatch} from "../../hooks";
import {useState} from "react";

const LoginBox = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const onFinish = async (loginForm: LoginForm) => {
        console.log(loginForm)
        await dispatch(loginAsync(loginForm))
        // const action = await dispatch(getInfoAsync())
        // if (getInfoAsync.fulfilled.match(action)) {
        //     let { urlForm } = action.payload
        //     console.log(action.payload)
        await router.push("/dashboard")
        // }
    };

    return (
        <>
            <div className={styles.login_box}>
                <div className={styles.hint_container}>
                    <span>Login</span>
                </div>
                <Form
                    name="normal_login"
                    className={styles.form_container}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <Input className={styles.login_input} prefix={<UserOutlined className="site-form-item-icon"
                                                                                    />}
                               placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input
                            className={styles.login_input}
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Button className={styles.login_btn} type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default LoginBox
