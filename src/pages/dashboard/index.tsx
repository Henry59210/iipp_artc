import {getLayout} from "@/components/Layout";
import {NextPageWithLayout} from "../_app";
import styles from "@/styles/dashboard.module.css"
import {useAppSelector} from "@/hooks";
import {selectRole} from "@/features/user/userSlice";
import {Button} from "antd";
import {downLoadMaterialInventory, downLoadProductInventory} from "@/apis/downloadFile";


const Dashboard: NextPageWithLayout = () => {
    const role = useAppSelector(selectRole)
    const downLoadProduct = async () => {
        const res = await downLoadProductInventory()
    }
    const downLoadMaterial = async () => {
        const res = await downLoadMaterialInventory()
    }
    return (
        <div className={styles.container}>
            {role === 'commercial' ? (
                <div style={{margin: 20}}>
                    <Button onClick={downLoadProduct}>Download Product Info</Button>
                    <Button onClick={downLoadMaterial}>Download Material Info</Button>
                </div>
            ) : 'Dashboard'}
        </div>
    )
}

export default Dashboard

Dashboard.getLayout = getLayout
