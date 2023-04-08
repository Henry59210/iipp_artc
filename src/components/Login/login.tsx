import styles from './styles.module.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Form, Input,Checkbox} from "antd";
import {loginAsync} from "../../features/user/userSlice";
import {router} from "next/client";
const LoginBox = () => {
    const onFinish = async (values: any) => {
       // let res = await loginAsync(values)
        await router.push('/')
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
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input className={styles.login_input} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            className={styles.login_input}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className={styles.login_btn} type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default LoginBox
