import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./login";
import Editor from "./Editor";
import UserStore from "./UserStore";
import TeacherEditor from "./TeacherEditor";

function App() {
    return (
        <UserStore>
            <div>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/workspace" element={<Editor/>}/>
                    <Route path="/teacher" element={<TeacherEditor/>}/>
                </Routes>
            </div>
        </UserStore>
    );
}

export default App;
