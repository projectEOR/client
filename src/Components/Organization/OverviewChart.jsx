import React, { useContext, useState} from 'react'
import { OverviewContext } from './OverviewContext'
import OrganizationChart from '@dabeng/react-orgchart'
import MyNode from './MyNode'


export default function OverviewChart(){
    const context=useContext(OverviewContext);
    const [tree, setTree] = useState(context.state.orgtree)
    return(
        <div>
            <OrganizationChart datasource={context.state.orgtree} NodeTemplate={MyNode} chartClass="myChart"/>
        </div>
    )
}