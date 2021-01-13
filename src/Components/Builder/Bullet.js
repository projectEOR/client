import { useState, useEffect, useContext } from 'react';
//import { BuilderContext } from './BuilderProvider'
import './Builder.css';
import { useParams } from 'react-router-dom';

function Bullet(props) {
    //const context = useContext(BuilderContext);
    const setActiveBullet = props.setActiveBullet;
    const handleUpdateBullet = props.handleUpdateBullet;
    let b = props.activeBullet;
    let {bullet_id} = useParams();
    

    useEffect(() => {
        document.getElementById("bulletForm")?.reset();
        props.getBullet(bullet_id);
        if(props.activeBullet){
        
    }
    }, [])

    async function handleBulletSubmit(e){
        e.preventDefault();
        console.log(b);
        handleUpdateBullet(b);
    }

    function handleBulletChange(e){
        let name = e.target.name;
        let value = e.target.value;
        props.setActiveBullet({...b, [e.target.name]: e.target.value});
        console.log(`Bullet Changed: ${name} is now "${value}`)
    }

    return (
        <>
        <form id="bulletForm" onSubmit={handleBulletSubmit} onChange={handleBulletChange}>
            <h3>Bullet ID: {b.id}</h3>
            <input type="submit" value="Save Updates"/><br></br>
            <label for="user_id">This Bullet belongs to User ID:</label><br></br>
                <input 
                    type="text" 
                    id="user_id" 
                    name="user_id" 
                    defaultValue={b.user_id}></input><br></br>

            <label for="report_id">This bullet is attached to Report ID:</label><br></br>
                <input 
                    type="text" 
                    id="report_id" 
                    name="report_id" 
                    defaultValue={b.report_id}
                    ></input><br></br>

            <label for="content">Bullet</label><br></br>
                <input type="text" id="content" name="content" defaultValue={b.content}></input><br></br>

            <label for="support">Bullet Supporting Documentation</label><br></br>
                <input type="text" id="support" name="support" defaultValue={b.support}></input><br></br>

            <label for="editorial_notes">Editorial Notes</label><br></br>
                <input type="text" id="editorial_notes" name="editorial_notes" defaultValue={b.editorial_notes}></input><br></br>

            <input type="submit" value="Save Updates" /><br></br>

        </form>
        {JSON.stringify(b)}
        </>
    )
}

export default Bullet;