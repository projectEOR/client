import { useState, useEffect, useContext } from 'react';
//import { BuilderContext } from './BuilderProvider'
import './Builder.css';
import { useParams } from 'react-router-dom';
import BulletsList from './BulletsList'

function Report(props) {
    //const context = useContext(BuilderContext);
    const setActiveReport = props.setActiveReport;
    const bulletsList = props.bulletsList;
    const setActiveBullet = props.setActiveBullet;
    const getBulletsList = props.getBulletsList;
    const handleDeleteBullet = props.handleDeleteBullet;
    const path = props.path;
    const activeReport = props.activeReport;
    const getReport = props.getReport;
    const handleUpdateBullet = props.handleUpdateBullet;
    const getBullet = props.getBullet;
    const baseURL = props.baseURL;
    let r = props.activeReport;
    let {report_id} = useParams();
    

    useEffect(() => {
        document.getElementById("reportForm")?.reset();
        props.getReport(report_id);
        if(props.activeReport){
        
    }
    }, [])

    const pFactors = () => {
        if(r.pfactors){
            return ( 
            
                    r.pfactors.map((p,i) => {
                    let pname = "pfactor"+i
                    
                    return (<>
                        <input type="checkbox" id={pname} name={pname} defaultChecked={(p)?true:false}></input>
                        <label for={pname}>{pname}</label><br></br>
                        </>
                        )
                    }
                )
        )
                }
                else{return}
    }

    async function handleReportSubmit(e){
        e.preventDefault();
        console.log(r);
        let rcopy = {...r};
        delete rcopy.id;
        let rJSON = JSON.stringify(rcopy);
        console.log(rJSON);
        let request = new XMLHttpRequest();
        request.open('PUT', `${baseURL}/reports/${r.id}`,true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = ()=>{
            console.log('Report Submitted')
        }
        request.send(rJSON)
        
    }

    function handleReportChange(e){
        let name = e.target.name;
        let value = e.target.value;
        
        if(name.includes("pfactor")){
            value = e.target.checked;
            let index = name[name.length-1]
            let newPF = r.pfactors;
            newPF[index] = value?1:0
            props.setActiveReport({...r, pfactors: newPF})
        }
        else{
            props.setActiveReport({...r, [e.target.name]: e.target.value});
        }
        
        console.log(`Report Changed: ${name} is now "${value}`)
    }

    return (
        <>
        <form id="reportForm" onSubmit={handleReportSubmit} onChange={handleReportChange}>
            <h3>Report ID: {r.id}</h3>
            <input type="submit" value="Save Updates"/><br></br>
            <label for="pr_type">Select type of Performance Report</label><br></br>
                <input 
                    type="text" 
                    id="pr_type" 
                    name="pr_type" 
                    defaultValue={r.pr_type}></input><br></br>

            <label for="afsc">AFSC</label><br></br>
                <input 
                    type="text" 
                    id="afsc" 
                    name="afsc" 
                    defaultValue={r.afsc}
                    ></input><br></br>

            <label for="org_id">Organization</label><br></br>
                <input type="text" id="org_id" name="org_id" defaultValue={r.org_id}></input><br></br>

            <label for="job_desc">Job Description</label><br></br>
                <input type="text" id="job_desc" name="job_desc" defaultValue={r.job_desc}></input><br></br>

            <label for="period_start">Evaluation Period Start</label><br></br>
                <input type="text" id="period_start" name="period_start" defaultValue={r.period_start}></input><br></br>

            <label for="period_end">Evaluation Period End</label><br></br>
                <input type="text" id="period_end" name="period_end" defaultValue={r.period_end}></input><br></br>

            <label for="sup_days">Number of Days with current Rater as Supervisor</label><br></br>
                <input type="text" id="sup_days" name="sup_days" defaultValue={r.sup_days}></input><br></br>

            <label for="non_rated_days">Number of Days in Non-Rated Position</label><br></br>
                <input type="text" id="non_rated_days" name="non_rated_days" defaultValue={r.non_rated_days}></input><br></br>

            <label for="last_feedback">Date of Last Feedback</label><br></br>
                <input type="text" id="last_feedback" name="last_feedback" defaultValue={r.last_feedback}></input><br></br>

            <label for="rater_id">Rater</label><br></br>
                <input type="text" id="rater_id" name="rater_id" defaultValue={r.rater_id}></input><br></br>

            <label for="addl_rater_id">Additional Rater</label><br></br>
                <input type="text" id="addl_rater_id" name="addl_rater_id" defaultValue={r.addl_rater_id}></input><br></br>
                
            <label for="reviewer_id">Reviewer</label><br></br>
                <input type="text" id="reviewer_id" name="reviewer_id" defaultValue={r.reviewer_id}></input><br></br>

            <label for="func_id">Functional</label><br></br>
                <input type="text" id="func_id" name="func_id" defaultValue={r.func_id}></input><br></br>

            <label for="remarks">Remarks</label><br></br>
                <input type="text" id="remarks" name="remarks" defaultValue={r.remarks}></input><br></br>

            <label for="referral_report">Referral Report</label><br></br>
                <input type="text" id="referral_report" name="referral_report" defaultValue={r.referral_report}></input><br></br>
            
            {pFactors()}

            <input type="submit" value="Save Updates" /><br></br>

        </form>
        {JSON.stringify(r)}
        <h2>Bullets in this Report</h2>
        <BulletsList 
            report_id={r.id} 
            bulletsList={bulletsList}
            setActiveBullet={setActiveBullet}
            getBulletsList={getBulletsList}
            handleDeleteBullet={handleDeleteBullet}
            path={path}
            activeReport={activeReport}
            getReport={getReport} 
            handleUpdateBullet={handleUpdateBullet}
            getBullet={getBullet}
            onRowClick="remove"
            baseURL={baseURL}/>
        
        <h2>Select Bullets to add to this Report</h2>
        <BulletsList 
            bulletsList={bulletsList}
            setActiveBullet={setActiveBullet}
            getBulletsList={getBulletsList}
            handleDeleteBullet={handleDeleteBullet}
            path={path}
            activeReport={activeReport}
            getReport={getReport} 
            onRowClick="add"
            activeReport={activeReport}
            handleUpdateBullet={handleUpdateBullet}
            getBullet={getBullet}
            baseURL={baseURL}/>
        </>
    )
}

export default Report;

