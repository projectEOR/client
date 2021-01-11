import { useState, useEffect, useContext } from 'react';
import { BuilderContext } from './BuilderProvider'
import './Builder.css';

function Report(props) {
    //const context = useContext(BuilderContext);
    const [bulletsList, setBulletsList] = useState([]);
    const [activeBullet, setActiveBullet] = useState({});
    let r;
    document.getElementById("reportForm")?.reset();
    if(props.activeReport){
        r = props.activeReport;
    }

    useEffect(() => {
        
    }, [])

    const pFactors = () => {
        if(r.pfactors){
            return ( 
            
                    r.pfactors.map((p,i) => {
                    let pname = "pfactor"+i
                    return (<>
                        <input type="checkbox" id={pname} name={pname}></input>
                        <label for={pname}>{pname}</label><br></br>
                        </>
                        )
                    }
                )
        )
                }
                else{return}
    }

    return (
        <>
        <form id="reportForm">
            <label for="pr_type">Select type of Performance Report</label><br></br>
                <input type="text" id="pr_type" name="pr_type" value={r.pr_type}></input><br></br>

            <label for="afsc">AFSC</label><br></br>
                <input type="text" id="afsc" name="afsc" value={r.afsc}></input><br></br>

            <label for="org_id">Organization</label><br></br>
                <input type="text" id="org_id" name="org_id" value={r.org_id}></input><br></br>

            <label for="job_desc">Job Description</label><br></br>
                <input type="text" id="job_desc" name="job_desc" value={r.job_desc}></input><br></br>

            <label for="period_start">Evaluation Period Start</label><br></br>
                <input type="text" id="period_start" name="period_start" value={r.period_start}></input><br></br>

            <label for="period_end">Evaluation Period End</label><br></br>
                <input type="text" id="period_end" name="period_end" value={r.period_end}></input><br></br>

            <label for="sup_days">Number of Days with current Rater as Supervisor</label><br></br>
                <input type="text" id="sup_days" name="sup_days" value={r.sup_days}></input><br></br>

            <label for="non_rated_days">Number of Days in Non-Rated Position</label><br></br>
                <input type="text" id="non_rated_days" name="non_rated_days" value={r.non_rated_days}></input><br></br>

            <label for="last_feedback">Date of Last Feedback</label><br></br>
                <input type="text" id="last_feedback" name="last_feedback" value={r.last_feedback}></input><br></br>

            <label for="rater_id">Rater</label><br></br>
                <input type="text" id="rater_id" name="rater_id" value={r.rater_id}></input><br></br>

            <label for="addl_rater_id">Additional Rater</label><br></br>
                <input type="text" id="addl_rater_id" name="addl_rater_id" value={r.addl_rater_id}></input><br></br>
                
            <label for="reviewer_id">Reviewer</label><br></br>
                <input type="text" id="reviewer_id" name="reviewer_id" value={r.reviewer_id}></input><br></br>

            <label for="func_id">Functional</label><br></br>
                <input type="text" id="func_id" name="func_id" value={r.func_id}></input><br></br>

            <label for="remarks">Remarks</label><br></br>
                <input type="text" id="remarks" name="remarks" value={r.remarks}></input><br></br>

            <label for="referral_report">Referral Report</label><br></br>
                <input type="text" id="referral_report" name="referral_report" value={r.referral_report}></input><br></br>
            
            {pFactors()}

        </form>
        {JSON.stringify(r)}
        </>
    )
}

export default Report;