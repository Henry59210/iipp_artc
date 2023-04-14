import {NextPage} from "next";
import {useRouter} from "next/router";
import {getLayout} from "../../components/Layout";
import {NextPageWithLayout} from "../_app";


const Dashboard: NextPageWithLayout = () => {
    const router = useRouter()
    return (
        <div>
            dashboard
        </div>
    )
}

export default Dashboard

Dashboard.getLayout = getLayout
