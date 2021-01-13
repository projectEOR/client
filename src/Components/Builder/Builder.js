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
import Bullet from './Bullet'

function Builder() {
  const [reportsList, setReportsList] = useState([]);
  const [activeReport, setActiveReport] = useState({});
  const [bulletsList, setBulletsList] = useState([]);
  const [activeBullet, setActiveBullet] = useState({});
  const { path } = useRouteMatch();
  const [counter, setCounter] = useState({})
  const baseURL = 'http://localhost:4000'
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
    getBulletsList();
  },[activeBullet,activeReport])

  async function getReportsList(){
    console.log('getReportsList() Called')
    getReportsList(-1);
  }

  async function getReportsList(justDeleted) {
    console.log('getReportsList(del) Called')
    reportsList.find(report=>report.id===justDeleted)
    let data = await fetch(`${baseURL}/reports/?user_id=1`);
    data = await data.json();
    await setReportsList(data);
    console.log("" + activeReport.id + " " + justDeleted)
    if(!activeReport.id || activeReport.id === justDeleted){
      console.log("Auto-assigning activeReport")
      setActiveReport(data[0])
    }
  }

  async function getBulletsList() {
    console.log('getReportsList() Called')
    getBulletsList(-1);
  }

  async function getBulletsList(justDeleted) {
    console.log('getBulletsList(del) Called')
    reportsList.find(report => report.id === justDeleted)
    let data = await fetch(`${baseURL}/bullets/?user_id=1`);
    data = await data.json();
    await setBulletsList(data);
    console.log("" + activeBullet.id + " " + justDeleted)
    if (!activeBullet.id || activeBullet.id === justDeleted) {
      console.log("Auto-assigning activeBullet")
      setActiveBullet(data[0])
    }
  }
  async function getReport(report_id){
    console.log('getReport(id) Called')
    let data = await fetch(`${baseURL}/reports/${report_id}?user_id=1`)
    data = await data.json()
    await setActiveReport(data[0])
    return await data[0];
  }
  async function getBullet(bullet_id) {
    console.log('getBullet(id) Called')
    let data = await fetch(`${baseURL}/bullets/${bullet_id}?user_id=1`)
    data = await data.json()
    await setActiveBullet(data[0])
    return await data[0];
  }
  async function createReport(){
    console.log('createReport Called')
    let rJSON = JSON.stringify({pr_type: 1})
    let request = new XMLHttpRequest();
    request.open('POST', `${baseURL}/reports/?user_id=1`, true);
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
      let data = await fetch(`${baseURL}/reports/${report_id}`, {
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

  async function handleDeleteBullet(bullet_id) {
    console.log('Delete Bullet Called')
    let del = window.confirm("Are you sure you would like to delete Bullet: " + bullet_id + "?");
    if (del) {
      let data = await fetch(`${baseURL}/bullets/${bullet_id}`, {
        method: 'DELETE',
      })
      data = await data.json();
      data = await data[0];
      console.log("just Deleted " + data.id);
      getBulletsList(data.id);
    }
    else {
      console.log("Thank you for not deleting")
    }
  }
  async function handleUpdateBullet(b){
    let bcopy = { ...b };
    delete bcopy.id;
    let bJSON = JSON.stringify(bcopy);
    console.log(bJSON);
    let request = new XMLHttpRequest();
    request.open('PUT', `${baseURL}/bullets/${b.id}`, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = () => {
      console.log('Bullet Submitted')
      getBulletsList();
    }
    request.send(bJSON)
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
          <Link to={`${path}/MyBullets`}>My Bullets</Link>
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
            getReport = {getReport}
            bulletsList = {bulletsList}
            setActiveBullet={setActiveBullet}
            getBulletsList={getBulletsList}
            handleDeleteBullet={handleDeleteBullet}
            path={path} 
            handleUpdateBullet={handleUpdateBullet}
            getBullet={getBullet}
            baseURL={baseURL}/>
        </Route>
        <Route exact path={`${path}/MyBullets`}>
          <BulletsList
            bulletsList={bulletsList}
            setActiveBullet={setActiveBullet}
            getBulletsList = {getBulletsList}
            handleDeleteBullet = {handleDeleteBullet}
            path={path}
            activeReport={activeReport}
            getReport={getReport} 
            handleUpdateBullet={handleUpdateBullet}
            getBullet={getBullet}
            baseURL={baseURL}/>
        </Route>
        <Route exact path={`${path}/bullet/:bullet_id`}>
          <Bullet
            activeBullet={activeBullet}
            setActiveBullet={setActiveBullet}
            getBullet={getBullet} 
            handleUpdateBullet={handleUpdateBullet}/>
        </Route>
      </Switch>
    </>
  ); 
}


export default Builder;
