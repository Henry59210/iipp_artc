import styles from './styles.module.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Form, Input} from "antd";
import {loginAsync, selectRole} from "../../features/user/userSlice";
import { useRouter } from 'next/router'
import {LoginForm} from "../../apis/userManagment";
import {chooseForm} from "../../utilities/permission";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {selectCount} from "../../features/counter/counterSlice";
const LoginBox = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    let role = useAppSelector(selectRole)
    const onFinish = async (loginForm: LoginForm) => {
        await dispatch(loginAsync(loginForm))
        console.log(selectRole);
        // let urlForm = chooseForm(role)
        // console.log(urlForm)
        // await router.push('/')
    };
    return (
        <>
            <div className={styles.login_box}>
                <div className={styles.hint_container}>
                    <span>Login</span>
                    <span>{role}</span>
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
