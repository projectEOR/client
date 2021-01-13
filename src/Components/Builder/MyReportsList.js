import React, { useEffect } from 'react';
import{ Link, useHistory } from 'react-router-dom';
//import {Alert} from "react-native";
import './Builder.css';
//import Report from './Report';
//import { BuilderContext } from './BuilderProvider';
import trashcan from './trashcan.png';

function MyReportsList(props) {
    const reportsList = props.reportsList;
    const setActiveReport = props.setActiveReport;
    const getReportsList = props.getReportsList;
    const handleDeleteReport = props.handleDeleteReport;
    const path = props.path;
    const history = useHistory();
    const getReport = props.getReport;
    //const context = useContext(BuilderContext);
    console.log("MyReports Rendered");

    useEffect(() => {
        getReportsList();
    }, [])

    // // async function getReport(report_id) {
    // //     let data = await fetch(`http://localhost:4000/reports/${report_id}?user_id=1`)
    // //     data = await data.json()
    // //     setActiveReport(data[0])
    // // }
    // async function createReport() {
    //     let data = await fetch('http://localhost:4000/reports/?user_id=1', {
    //         method: 'POST',
    //         body: '"pr_type":0',
    //     })
    // }
    

    const tableReportsHeaders = () => {
        return (
            <tr>
                <th>Report ID</th>
                <th>User ID</th>
                <th>Closeout Date</th>
                <th>Delete</th>
            </tr>
        )
    }
    const navigateToReport = async (e,report_id) => {
        console.log(e)
        if(e.target.className !== "trashcan"){
            let res = await getReport(report_id);
            console.log(await res);
            history.push(`${path}/report/${report_id}`);
        }
    }

    const tableReportsEntries = () => {
        return reportsList.map(report => {
            return (
                <tr onClick={(e) => navigateToReport(e,report.id)}>
                    <td>
                        {report.id}
                    </td>
                    <td>
                        {report.user_id}
                    </td>
                    <td>
                        {report.period_end}
                    </td>
                    <td>
                        <img src={trashcan} alt="delete" class="trashcan" onClick={() => handleDeleteReport(report.id)}></img>
                    </td>
                </tr>
            )
        })
    }
    const tableReports = () => {
        return (
            <table>
                <thead>{tableReportsHeaders()}</thead>
                <tbody>{tableReportsEntries()}</tbody>
                
            </table>

        )
    }


    return (
        <>
            {tableReports()}
        </>
    );




}

export default MyReportsList;