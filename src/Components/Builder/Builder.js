import React, { useContext, useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  Link
} from "react-router-dom";
//import {Alert} from "react-native";
import './Builder.css';
import Report from './Report';
//import {BuilderContext} from './BuilderProvider';
//import trashcan from './trashcan.png';
import MyReportsList from './MyReportsList'
import BulletsList from './BulletsList'

function Builder() {
  const [reportsList, setReportsList] = useState([]);
  const [activeReport, setActiveReport] = useState({});
  const { path } = useRouteMatch();
  const [counter, setCounter] = useState({})
  // if(!counter.count){
  //   setCounter({count: 1})
  // }
  // else{
  //   setCounter({count: ++counter.count})
  // }
  // console.log('Builder Component Loaded ' + counter.count)

  //const context = useContext(BuilderContext);

  useEffect(()=>{
    console.log('useEffect Called in Builder')
    //getReportsList();
  },[])

  async function getReportsList(){
    console.log('getReportsList() Called')
    getReportsList(-1);
  }

  async function getReportsList(justDeleted) {
    console.log('getReportsList(del) Called')
    reportsList.find(report=>report.id===justDeleted)
    let data = await  fetch('http://localhost:4000/reports/?user_id=1');
    data = await data.json();
    await setReportsList(data);
    console.log("" + activeReport.id + " " + justDeleted)
    if(!activeReport.id || activeReport.id === justDeleted){
      console.log("Auto-assigning activeReport")
      setActiveReport(data[0])
    }
  }
  async function getReport(report_id){
    console.log('getReport(id) Called')
    let data = await fetch(`http://localhost:4000/reports/${report_id}?user_id=1`)
    data = await data.json()
    await setActiveReport(data[0])
    return await data[0];
  }
  async function createReport(){
    console.log('createReport Called')
    let rJSON = JSON.stringify({pr_type: 1})
    let request = new XMLHttpRequest();
    request.open('POST', `http://localhost:4000/reports/?user_id=1`, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = () => {
      console.log('Report Created')
      let res = JSON.parse(request.response)
      setActiveReport(res[0])
      getReportsList()
    }
    request.send(rJSON)
  }
  async function handleDeleteReport(report_id) {
    console.log('Delete Report Called')
    let del = window.confirm("Are you sure you would like to delete Report: " + report_id + "?");
    if (del) {
      let data = await fetch('http://localhost:4000/reports/' + report_id, {
        method: 'DELETE',
      })
      data = await data.json();
      data = await data[0];
      console.log("just Deleted " + data.id);
      getReportsList(data.id);
    }
    else {
      console.log("Thank you for not deleting")
    }
  }


  return (
    <>
      <ul>
        <li>
          <Link to={`${path}/MyReports`}>My Reports</Link>
        </li>
        <li>
          <Link to={`${path}/report/${activeReport.id}`}>Active Report</Link>
        </li>
        <li>
          <Link to={`${path}/report/${activeReport.id}`}>My Bullets</Link>
        </li>

      </ul>
      <button onClick={createReport}>Create New Report</button>
      <Switch>
        <Route exact path={`${path}/`}>
          <Redirect to={`${path}/MyReports`} />
        </Route>
        <Route exact path={`${path}/MyReports`} >
          <h1>My Reports</h1>
          <MyReportsList 
            reportsList={reportsList} 
            setActiveReport={setActiveReport} 
            getReportsList={getReportsList}
            getReport = {getReport}
            handleDeleteReport={handleDeleteReport}
            path={path}
          />
        </Route>
        <Route exact path={`${path}/report/:report_id`}>
          <Report 
            activeReport={activeReport}
            setActiveReport={setActiveReport}
            getReport = {getReport} />
        </Route>
        <Route exact path={`${path}/MyBullets`}>
          <BulletsList
            activeReport={activeReport}
            getReport={getReport} />
        </Route>
      </Switch>
    </>
  ); 
}


export default Builder;
