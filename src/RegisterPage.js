import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';


const RegisterPage = () => {

    const [id, setId] = useState('');

    const onChange = (e) => {
        setId(e.target.value);
    }

    const onClick = async() => {
        const options = {
            method: 'post',
            url: 'http://localhost:8002/users/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                user_id: id
            }
        }
        try {
        console.log('niqqers')
         let output = await axios(options)
         console.log(output)   
        } catch (error) {
            console.error(error)
        }
    }
   return(
    <div>
    <h2>Enter Username</h2>
    <div className="m-10"></div>
            <input
                className="
                    form-control
                    block
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-auto
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                onChange={onChange} value={id} placeholder="Username"
            />
            <div className="m-10"></div>
            <Link to="/">
                <button
                    className="py-2 px-4 block rounded-lg shadow-md text-white bg-blue-600 m-auto hover:bg-blue-800"
                    onClick={onClick}
                >register
                </button>
            </Link>
    </div>
   )
}


export default RegisterPage;