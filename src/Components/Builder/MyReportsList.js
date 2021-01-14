import React, { useEffect } from 'react';
import{ Link, useHistory } from 'react-router-dom';
//import {Alert} from "react-native";
import './Builder.css';
//import Report from './Report';
//import { BuilderContext } from './BuilderProvider';
import trashcan from './trashcan.png';
import { MDCDataTable } from '@material/data-table';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'


// @use "@material/data-table/data-table";
// @include data - table.core - styles;
// @include data - table.theme - baseline;



function MyReportsList(props) {
    const reportsList = props.reportsList;
    const setActiveReport = props.setActiveReport;
    const getReportsList = props.getReportsList;
    const handleDeleteReport = props.handleDeleteReport;
    const path = props.path;
    const history = useHistory();
    const getReport = props.getReport;
    //const document = new Document();
    //const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
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
            <TableRow >
                <TableCell >Report ID</TableCell>
                <TableCell >User ID</TableCell>
                <TableCell >Closeout Date</TableCell>
                <TableCell >Delete</TableCell>
            </TableRow>
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
                <TableRow onClick={(e) => navigateToReport(e,report.id)} >
                    <TableCell>
                        {report.id}
                    </TableCell>
                    <TableCell>
                        {report.user_id}
                    </TableCell>
                    <TableCell>
                        {report.period_end}
                    </TableCell>
                    <TableCell>
                        <img src={trashcan} alt="delete" class="trashcan" onClick={() => handleDeleteReport(report.id)}></img>
                    </TableCell>
                </TableRow>
            )
        })
    }
    const tableReports = () => {
        return (
                <TableContainer component={Paper} >
                    <Table >
                        <TableHead>{tableReportsHeaders()}</TableHead>
                        <TableBody>{tableReportsEntries()}</TableBody>
                        
                    </Table>
                </TableContainer>
            

        )
    }


    return (
        <>
            {tableReports()}
        </>
    );




}

export default MyReportsList;