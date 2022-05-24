import React, {useState} from "react";
import {User} from "./User";

function Login() {

    const [id, setId] = useState('');

    const onChange = (e) => {
        setId(e.target.value);
    }

    const onClick = () => {
        let user = new User(id, '');
        console.log(user);
    }

    return (
        <div>
            <input onChange={onChange} value={id}/>
            <button onClick={onClick}>로그인</button>
        </div>
    )
}

export default Login