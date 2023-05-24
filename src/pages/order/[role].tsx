import {NextPageWithLayout} from "../_app";
import {useRouter} from "next/router";
import {getLayout} from "@/components/Layout";

const Order: NextPageWithLayout = () => {
    const router = useRouter()
    return (
        <div>
            order
        </div>
    )
}

export default Order

Order.getLayout = getLayout
