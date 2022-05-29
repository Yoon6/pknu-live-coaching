import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./login";
import App2 from "./App2";
import UserStore from "./UserStore";

function App() {
    return (
        <UserStore>
            <div>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/workspace" element={<App2/>}/>
                </Routes>
            </div>
        </UserStore>
    );
}

export default App;
