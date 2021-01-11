import React, { useContext, useEffect, useState} from 'react';
//import {Alert} from "react-native";
import './Builder.css';
import Report from './Report';
import {BuilderContext} from './BuilderProvider';
import trashcan from './trashcan.png';

function Builder() {
  const [reportsList, setReportsList] = useState([]);
  const [activeReport, setActiveReport] = useState({});
  //const context = useContext(BuilderContext);

  useEffect(()=>{
    getReportsList();
  },[])

async function getReportsList(){
  getReportsList(-1);
}

  async function getReportsList(justDeleted) {
    let data = await  fetch('http://localhost:4000/reports/?user_id=1');
    data = await data.json();
    await setReportsList(data);
    if(!activeReport.id || activeReport.id == justDeleted){
      console.log("Auto-assigning activeReport")
      setActiveReport(data[0])
    }
  }
  async function getReport(report_id){
    let data = await fetch(`http://localhost:4000/reports/${report_id}?user_id=1`)
    data = await data.json()
    setActiveReport(data[0])
  }
  async function createReport(){
    let data = await fetch('http://localhost:4000/reports/?user_id=1',{
      method: 'POST',
      body: '"pr_type":0',
    })
  }
  async function handleDeleteReport(report_id){
    let del = window.confirm("Are you sure you would like to delete Report: "+report_id+"?");
    if(del){
      let data = await fetch('http://localhost:4000/reports/'+report_id, {
        method: 'DELETE',
      })
      data = await data.json();
      data = await data[0];
      console.log("just Deleted "+data.id);
      getReportsList(data.id);
    }
    else{
      console.log("Thank you for not deleting")
    }
  }

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
  const tableReportsEntries = () => {
      return reportsList.map(report => {
        return (
          <tr onClick={()=>getReport(report.id)}>
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
              <img src={trashcan} alt="delete" class="trashcan" onClick={()=>handleDeleteReport(report.id)}></img>
            </td>
          </tr>
        )
      })
    }
  const tableReports = () => {
    return (
      <table>
        {tableReportsHeaders()}
        {tableReportsEntries()}
      </table>
      
    )
  }


  return (
    <>
      <h1>
        My Reports
      </h1>
      {tableReports()}
      <Report activeReport={activeReport}></Report>
    </>
  );
  
  

  
}


export default Builder;
