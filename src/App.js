import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./login";
import Editor from "./Editor";
import UserStore from "./UserStore";

function App() {
    return (
        <UserStore>
            <div>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/workspace" element={<Editor/>}/>
                </Routes>
            </div>
        </UserStore>
    );
}

export default App;
