import React, { useEffect } from 'react';
import{ Link, useHistory } from 'react-router-dom';
//import {Alert} from "react-native";
import './Builder.css';
//import Bullet from './Bullet';
//import { BuilderContext } from './BuilderProvider';
import trashcan from './trashcan.png';

function BulletsList(props) {
    const bulletsList = props.bulletsList;
    const setActiveBullet = props.setActiveBullet;
    const getBulletsList = props.getBulletsList;
    const handleDeleteBullet = props.handleDeleteBullet;
    const path = props.path;
    const history = useHistory();
    //const context = useContext(BuilderContext);
    console.log("MyBullets Rendered");

    useEffect(() => {
        getBulletsList();
    }, [])

    async function getBullet(bullet_id) {
        let data = await fetch(`http://localhost:4000/bullets/${bullet_id}?user_id=1`)
        data = await data.json()
        setActiveBullet(data[0])
    }
    async function createBullet() {
        let data = await fetch('http://localhost:4000/bullets/?user_id=1', {
            method: 'POST',
            body: '"pr_type":0',
        })
    }
    

    const tableBulletsHeaders = () => {
        return (
            <tr>
                <th>Bullet ID</th>
                <th>User ID</th>
                <th>Closeout Date</th>
                <th>Delete</th>
            </tr>
        )
    }
    const navigateToBullet = (bullet_id) => {
        getBullet(bullet_id);
        history.push(`${path}/bullet/${bullet_id}`);
    }

    const tableBulletsEntries = () => {
        return bulletsList.map(bullet => {
            return (
                <tr onClick={() => navigateToBullet(bullet.id)}>
                    <td>
                        {bullet.id}
                    </td>
                    <td>
                        {bullet.user_id}
                    </td>
                    <td>
                        {bullet.period_end}
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
        </>
    );




}

export default BulletsList;