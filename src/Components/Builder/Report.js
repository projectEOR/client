import { useState, useEffect, useContext } from 'react';
//import { BuilderContext } from './BuilderProvider'
import './Builder.css';
import { useParams } from 'react-router-dom';
import BulletsList from './BulletsList'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { TextField, Grid, TextareaAutosize } from '@material-ui/core';


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
    let { report_id } = useParams();


    useEffect(() => {
        document.getElementById("reportForm")?.reset();
        props.getReport(report_id);
        if (props.activeReport) {

        }
    }, [])

    const pFactors = () => {
        if (r.pfactors) {
            return (

                r.pfactors.map((p, i) => {
                    let pname = "pfactor" + i

                    return (<>
                        <input type="checkbox" id={pname} name={pname} defaultChecked={(p) ? true : false}></input>
                        <label for={pname}>{pname}</label><br></br>
                    </>
                    )
                }
                )
            )
        }
        else { return }
    }

    async function handleReportSubmit(e) {
        e.preventDefault();
        console.log(r);
        let rcopy = { ...r };
        delete rcopy.id;
        let rJSON = JSON.stringify(rcopy);
        console.log(rJSON);
        let request = new XMLHttpRequest();
        request.open('PUT', `${baseURL}/reports/${r.id}`, true);
        request.setRequestHeader("Content-type", "application/json");
        request.onload = () => {
            console.log('Report Submitted')
        }
        request.send(rJSON)

    }

    function handleReportChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        if (name.includes("pfactor")) {
            value = e.target.checked;
            let index = name[name.length - 1]
            let newPF = r.pfactors;
            newPF[index] = value ? 1 : 0
            props.setActiveReport({ ...r, pfactors: newPF })
        }
        else {
            props.setActiveReport({ ...r, [e.target.name]: e.target.value });
        }

        console.log(`Report Changed: ${name} is now "${value}`)
    }

    return (
        <>
            <form id="reportForm" onSubmit={handleReportSubmit} onChange={handleReportChange}>
                <h3>Report ID: {r.id}</h3>
                <Button type="submit" value="Save Updates" startIcon={<SaveIcon />} variant="outlined">Save Updates</Button> <br></br>
                <Grid
                    container
                    spacing={3}
                    direction="rows"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={3}>
                        <TextField
                            type="text"
                            id="pr_type"
                            name="pr_type"
                            defaultValue={r.pr_type}
                            label="PR Type"
                            variant="filled" 
                            fullWidth={true}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="text"
                            id="afsc"
                            name="afsc"
                            defaultValue={r.afsc}
                            label="AFSC"
                            variant="filled"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="text"
                            id="org_id"
                            name="org_id"
                            defaultValue={r.org_id}
                            label="Organization"
                            variant="filled"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="text"
                            id="job_desc"
                            name="job_desc"
                            defaultValue={r.job_desc}
                            label="Job Description"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="date"
                            id="period_start"
                            name="period_start"
                            defaultValue={r.period_start?.slice(0, 10)}
                            label="Evaluation Period Start"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="date"
                            id="period_end"
                            name="period_end"
                            defaultValue={r.period_end?.slice(0, 10)}
                            label="Evaluation Period End"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="number"
                            id="sup_days"
                            name="sup_days"
                            defaultValue={r.sup_days}
                            label="Days with Current Supervisor"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="number"
                            id="non_rated_days"
                            name="non_rated_days"
                            defaultValue={r.non_rated_days}
                            label="Days in Non-Rated Position"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="date"
                            id="last_feedback"
                            name="last_feedback"
                            defaultValue={r.last_feedback?.slice(0, 10)}
                            label="Date of Last Feedback"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="number"
                            id="rater_id"
                            name="rater_id"
                            defaultValue={r.rater_id}
                            label="Rater"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="number"
                            id="addl_rater_id"
                            name="addl_rater_id"
                            defaultValue={r.addl_rater_id}
                            label="Additional Rater"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="number"
                            id="reviewer_id"
                            name="reviewer_id"
                            defaultValue={r.reviewer_id}
                            label="Reviewer"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={3}>
                        <TextField
                            type="number"
                            id="func_id"
                            name="func_id"
                            defaultValue={r.func_id}
                            label="Functional"
                            variant="filled"
                            fullWidth={true}
                        /></Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            id="remarks"
                            name="remarks"
                            defaultValue={r.remarks}
                            label="Remarks"
                            variant="filled"
                            fullWidth={true}
                            multiline
                        /></Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            id="referral_report"
                            name="referral_report"
                            defaultValue={r.referral_report}
                            label="Referral Report"
                            variant="filled"
                            fullWidth={true}
                            multiline
                        /></Grid>
                    <Grid item>
                        {pFactors()}
                    </Grid>
                </Grid>


                <Button type="submit" value="Save Updates" startIcon={<SaveIcon />} variant="outlined">Save Updates</Button> <br></br>


            </form>
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
                baseURL={baseURL} />

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
                baseURL={baseURL} />
        </>
    )
}

export default Report;

