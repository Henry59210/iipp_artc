import {NextPage} from "next";
import {getLayout} from "../../components/Layout";
import {NextPageWithLayout} from "../_app";


const WorkbenchCommercial: NextPageWithLayout = () => {
    return (
        <div>
            Workbench-Commercial
        </div>
    )
}

export default WorkbenchCommercial

WorkbenchCommercial.getLayout = getLayout
