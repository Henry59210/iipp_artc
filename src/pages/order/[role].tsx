import {NextPageWithLayout} from "../_app";
import {useRouter} from "next/router";
import {getLayout} from "@/components/Layout";
import {OrderForm} from "@/components/Global/OrderForm";

const Order: NextPageWithLayout = () => {
    const router = useRouter()
    return (
        <div>

        </div>
    )
}

export default Order

Order.getLayout = getLayout
