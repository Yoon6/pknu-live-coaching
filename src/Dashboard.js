import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import jwt from 'jsonwebtoken'

import "./tailwindcss.css";


const Dashboard = () => {
    // app router history hook
    let data
    let navigate = useNavigate()
    //get all user's project
    async function fetchprojects(){
        try {
            const options = {
                method: 'GET',
                url: 'http://localhost:8002/users/getprojects',
                headers: {
                    'x-access-token': localStorage.getItem('token')
                },
            }
            data = await axios(options)
            
        } catch (error) {
            
        }
        
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                // get projects from server
                fetchprojects()
            }
        }
    })
    const onclick = async ()=>{
        //create new project
        try {
            const options = {
                method: 'POST',
                url: 'http"//localhost:8002/users/newproject',
                headers:{
                    'x-access-token': localStorage.getItem('token')
                },
                data: {
                    title: 'new project javascript',
                    language_id: 63
                }
            }
            const newproject = await axios(options)
            localStorage.setItem('newproject',newproject)
            //go to project editor screen
            window.location.href = '/workspace'

        } catch (error) {
            
        }
    }
    const onclick2 = async (projectid)=> {
        localStorage.setItem('currentproject',projectid)
        window.location.href = '/workspace'
    }

    return (
        <div>
            <h1>User's Dashboard</h1>
            <ProjectList>
                <Project
                    onClick={onclick}
                >   
                    <h4><b>Create New Project</b></h4>
                    
                </Project>
                {data.map(projId => {
                    return (
                        <Project
                        onClick={onclick2(projId._id)}>
                            <h4><b>{projId.name}</b></h4>
                            <h>{projId.lang}</h>
                        </Project>
                    )
                })}
            </ProjectList>
        </div>
    )
        
}

const Project = styled.button`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 149px 10px 10px;
    gap: 5px;
    width: 326px;

    background: #D7D7D7;
`

const ProjectList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`

export default Dashboard;