import React, { useEffect } from 'react';
import{ Link, useHistory } from 'react-router-dom';
//import {Alert} from "react-native";
import './Builder.css';
//import Bullet from './Bullet';
//import { BuilderContext } from './BuilderProvider';
import trashcan from './trashcan.png';

function BulletsList(props) {
    const bulletsList = props.bulletsList;
    const getBullet = props.getBullet;
    const setActiveBullet = props.setActiveBullet;
    const getBulletsList = props.getBulletsList;
    const handleDeleteBullet = props.handleDeleteBullet;
    const handleUpdateBullet = props.handleUpdateBullet;
    const path = props.path;
    const history = useHistory();
    const activeReport = props.activeReport;
    let onRowClick = props?.onRowClick;
    let reportBullets;
    let addOrRemove = "";
    const deadReport = 46;
    const baseURL = props.baseURL;
    let report_id;
    if(props?.report_id){
        report_id = props.report_id;
        reportBullets = bulletsList.filter(e => e.report_id === report_id)
    }
    else if(props?.report_id == null || props?.report_id === deadReport){
        reportBullets = bulletsList.filter(e => e.report_id === deadReport || e.report_id == null)
    }
    //const context = useContext(BuilderContext);
    console.log("MyBullets Rendered");

    useEffect(() => {
        getBulletsList();
        console.log(`UseEffect called in BulletsList`)
    }, [])

    async function createBullet(r_id) {
        console.log('createBullet Called')
        let request = new XMLHttpRequest();
        request.open('POST', `${baseURL}/bullets/?user_id=1`, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = () => {
            console.log('Report Created')
            let res = JSON.parse(request.response)
            res = res[0];
            if(r_id){
                res.report_id = r_id;
                handleUpdateBullet(res)
            }
            setActiveBullet(res)
            getBulletsList()
        }
        request.send()
    }
    

    const tableBulletsHeaders = () => {
        return (
            <tr>
                <th>Bullet ID</th>
                <th>Report ID</th>
                <th>Content</th>
                <th>Active Report: {activeReport.id}</th>
                <th>Delete</th>
                
            </tr>
        )
    }
    const navigateToBullet = async (e, bullet_id) => {
        console.log(e)
        if (e.target.className !== "trashcan" && 
            e.target.className !== "addToReport") {
            let res = await getBullet(bullet_id);
            console.log(await res);
            history.push(`${path}/bullet/${bullet_id}`);
        }
    }
    const addBulletToReport = async (e, bullet_id) => {
        if(onRowClick==="remove"){
            removeBulletFromReport(e,bullet_id);
            return;
        }
        let res = await getBullet(bullet_id);
        res.report_id = await activeReport.id;
        console.log(await res);
        await handleUpdateBullet(res);
        await getBulletsList();
        console.log(`Bullet ${bullet_id} has been added to Report ${activeReport.id}`)
    }
    const removeBulletFromReport= async (e, bullet_id) => {
        let res = await getBullet(bullet_id).then((response)=>{
            response.report_id = deadReport;
            console.log(response);
            handleUpdateBullet(response).then(()=>getBulletsList());
            return response;
        });
        
        console.log(`Bullet ${bullet_id} has been removed from Report ${activeReport.id}`)
    }

    const tableBulletsEntries = () => {
        let b;
        if (reportBullets){
            b = reportBullets;
        }
        else{
            b = bulletsList;
        }
        return b.sort((a,b)=>-(a.id-b.id)).map(bullet => {
            return (
                <tr onClick={(e) => navigateToBullet(e,bullet.id)}>
                    <td>
                        {bullet.id}
                    </td>
                    <td>
                        {(bullet.report_id===deadReport||!bullet.report_id)?"None":bullet.report_id}
                    </td>
                    <td>
                        {bullet.content}
                    </td>
                    <td>
                        <button class="addToReport" onClick={(e)=>addBulletToReport(e,bullet.id)}>{(onRowClick==="remove")?"Remove from Report":"Add to Report"}</button>
                    </td>
                    <td>
                        <img src={trashcan} alt="delete" class="trashcan" onClick={() => handleDeleteBullet(bullet.id)}></img>
                    </td>
                    
                </tr>
            )
        })
    }
    const tableBullets = () => {
        return (
            <table>
                {tableBulletsHeaders()}
                {tableBulletsEntries()}
            </table>

        )
    }


    return (
        <>
            {tableBullets()}
            <button onClick={()=>createBullet(report_id)}>Create New Bullet</button>
        </>
    );




}

export default BulletsList;