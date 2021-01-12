import './Organization.css';
import React, {useContext} from 'react'
import OverviewProvider, { OverviewContext } from './OverviewContext';
import OrgSelect from './OrgSelect'
import OverviewChart from './OverviewChart';
export default function Organization() {
    const context=useContext(OverviewContext)
    if(context.state.orgs && Array.isArray(context.state.orgs) && Array.isArray(context.state.unitmembers) && context.state.senior && (typeof context.state.orgtree)==='object'){
        return (
            <div>
            <div>
                <OrgSelect/>    
            </div>
            <OverviewChart/>
            </div>
        );
    }else{
        return(
            <h1>Loading...</h1>
        )
    }
}
