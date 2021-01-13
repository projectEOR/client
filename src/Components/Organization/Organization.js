import './Organization.css';
import React, {useContext} from 'react'
import OverviewProvider, { OverviewContext } from './OverviewContext';
import OverviewWrapper from './OverviewWrapper';
export default function Organization() {
    return (
        <OverviewProvider>
            <OverviewWrapper/>
        </OverviewProvider>
    )
    
}
