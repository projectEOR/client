import React, { useContext } from 'react'
import OverviewChart from './OverviewChart'
import {OverviewContext} from './OverviewContext'
export default function OverviewWrapper(){
    const context=useContext(OverviewContext)
    if(context.state.orgs && Array.isArray(context.state.orgs) && Array.isArray(context.state.unitmembers) && context.state.senior && (typeof context.state.orgtree)==='object'){
        return (
            <div>
            <OverviewChart/>
            </div>
        );
    }else{
        return(
            <h1>Loading...</h1>
        )
    }

}