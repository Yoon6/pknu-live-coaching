import React, { createContext, useState } from 'react';

export const UserContext = createContext();

function UserStore (props) {
    const [username, setUsername] = useState("");
    const [msg, setMsg] = useState("");

    return (
        <UserContext.Provider value={{
            username,
            setUsername,
            msg,
            setMsg
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserStore
