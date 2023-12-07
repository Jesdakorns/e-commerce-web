import { Box } from "@mui/material"
import { ReactNode } from "react"


type RenderItemsProps = {
    hasLoader?: boolean,
    hiddenEnd?: boolean,
    loader?: ReactNode,
    children?: ReactNode,
    endEl?: ReactNode,
    noDataEl?: ReactNode,
    dataLength?: number
}

const RenderItems = ({ hasLoader, loader, children, endEl, noDataEl, dataLength, hiddenEnd }: RenderItemsProps) => {

    if (hasLoader) {
        return <>{loader} {endEl}</>
    }

    return <>{!!dataLength ? (children) : (noDataEl)}{!hiddenEnd ? (<Box mt={2}>{endEl}</Box>) : null}</>
}
export default RenderItems