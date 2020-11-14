import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "./styles/styles.scss";

import Login from "./components/Login";
import Background from "./components/Background";
import Stats from "./components/Stats";
import Register from "./components/Register";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./components/Dashboard";

const App = function (props) {
    const [profile, setProfile] = useState({
        username: "",
        isAuthenticated: false
    });
    return <BrowserRouter>
        <Switch>
            <Route path="/" exact>
                
                <Background class="back__image"></Background>
                <Stats></Stats>
            </Route>
            <Route path="/login">
                
                <Background class="back__image"></Background>
                <Login setProfile={setProfile}></Login>
            </Route>
            <Route path="/register">
                
                <Background class="back__image"></Background>
                <Register></Register>
            </Route>
            <ProtectedRoute {...profile} path="/dashboard">
                <Dashboard>
                </Dashboard>
            </ProtectedRoute>
        </Switch>
    </BrowserRouter>
}

ReactDOM.render(<App></App>, document.getElementsByClassName("root")[0]);