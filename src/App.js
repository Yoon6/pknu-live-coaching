import CodeEditor from '@uiw/react-textarea-code-editor';
import React from "react";

function App() {
    const [code, setCode] = React.useState(
        `int main(void) {\n  printf("Hello World!"); \n}`
    );
    const ws = new WebSocket("ws://localhost:8001");
    function sendCode(code) {
        ws.send(code);
    }
    return (
        <div>
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
    );
}

export default App;
