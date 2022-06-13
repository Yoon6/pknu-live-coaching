import CodeEditor from '@uiw/react-textarea-code-editor';
import React, {useContext} from "react";
import {UserContext} from "./UserStore";
import "./tailwindcss.css";
import axios from "axios";

const getUserSrc = async (user) => {
    return await axios.get(`http://210.110.136.112/users/srcfile?id=${user}`);
}
const compile = async (user) => {
    return await axios.get(`http://210.110.136.112/users/compile?id=${user}`);
}
const getUserList = async () => {
    return await axios.get(`http://210.110.136.112/users/dir?id=`);
}

function TeacherEditor() {

    const context = useContext(UserContext);
    const [code, setCode] = React.useState("");
    const [result, setResult] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const ws = new WebSocket("ws://210.110.136.112/ws");
    const [selected, setSelected] = React.useState("");

    const tmp = async() => {
        const array = await getUserList();
        setUsers(Object.values(array.data.data.split('\n')))
    }
    React.useEffect(()=> {
        tmp();
    },[])

    function sendCode(code) {
        console.log("ws");
        const user = {
            id: selected,
            message: code
        }
        ws.send(JSON.stringify(user));
    }

    function onClickCompile() {
        compile(selected).then(r => setResult(r.data.stdout));
        getUserSrc(selected).then(r => setCode(r.data.data)); // 임시 동기화

    }

    const handleSelect = (e) => {
        setSelected(e.target.value);
        getUserSrc(e.target.value).then(r => setCode(r.data.data));
    };

    return (
        <div>
            <header className="p-4 shadow-sm">
                <div className="inline-block text-lg"><h1>PKNU LIVE COACHING</h1></div>
                <select onChange={handleSelect} value={selected} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">>
                    {users.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </header>
            <div className="flex">
                <div
                    className="flex-auto w-1/5 card m-2 cursor-pointer border border-gray-400 rounded-lg ">
                    <div className="m-3">
                        <h2 className="text-lg mb-2 font-semibold">Current Dir : {selected}/</h2>
                    </div>
                    <ul className="divide-y-2 divide-gray-400">
                        <li className="flex justify-between p-3 hover:bg-blue-600 hover:text-blue-200">
                            ..
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </li>
                        <li className="flex justify-between p-3 hover:bg-blue-600 hover:text-blue-200">
                            New File
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </li>
                        <li className="flex items-center justify-between p-3 hover:bg-blue-600 hover:text-blue-200">
                            source.c
                        </li>
                    </ul>
                </div>
                <div className="m-2 flex-auto w-full">
                    <CodeEditor
                        value={code}
                        language="c"
                        placeholder="Please enter C code."
                        onChange={(evn) => {
                            setCode(evn.target.value);
                            sendCode(evn.target.value);
                        }
                        }
                        padding={15}
                        style={{
                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
            </div>
            <button onClick={onClickCompile} className="py-2 px-4 rounded-lg shadow-md text-white bg-blue-600 m-auto hover:bg-blue-800">compile</button>
            {result}
        </div>
    );
}

export default TeacherEditor;
