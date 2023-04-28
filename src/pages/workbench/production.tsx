import {NextPageWithLayout} from "@/pages/_app";
import {getLayout} from "@/components/Layout";

const WorkbenchProduction: NextPageWithLayout = () => {
    return (
        <div>
            Workbench-Commercial
        </div>
    )
}

export default WorkbenchProduction

WorkbenchProduction.getLayout = getLayout
