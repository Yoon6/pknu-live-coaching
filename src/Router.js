import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {App, Login} from './';

function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/editor" component={App}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Router