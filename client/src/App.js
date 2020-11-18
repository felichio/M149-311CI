import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import "./styles/styles.scss";

import jwt from "jsonwebtoken";
import moment from "moment";
import axios from "axios";
import Login from "./components/Login";
import Background from "./components/Background";
import Stats from "./components/Stats";
import Register from "./components/Register";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./components/Dashboard";

const App = function (props) {
    const [profile, setProfile] = useState({
        id: null,
        username: null,
        email: null,
        isAuthenticated: false
    });

    const [requests, setRequests] = useState({
        total: "",
        opened: "",
        closed: "",
    });

    console.log("APp");
    let history = useHistory();
    
    useEffect(() => {
        const token = window.localStorage.getItem("_token");
        console.log("check");
        if (token) {
            const payload = jwt.decode(token);
            
            if (moment().unix() < payload.exp) {
                setProfile(prev => ({
                    id: payload.id,
                    username: payload.username,
                    email: payload.email,
                    isAuthenticated: true,
                }));
                
                history.push("/dashboard");
            } else {
                setProfile(prev => ({id: null, username: null, email: null, isAuthenticated: false}));
                history.push("/login");
            }
        }
        
        
    }, []);

    useEffect(() => {
        axios.get("/api/stats").then(d => {
            setRequests(prev => ({
                ...d.data,
            }));
            console.log("run");
        });
    }, []);

    return <>
        <Switch>
            <Route path="/" exact>
                
                <Background class="back__image"></Background>
                <Stats requests={requests}></Stats>
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
                <Dashboard profile={profile}>
                    
                </Dashboard>
            </ProtectedRoute>
            
        </Switch>
    </>
}

ReactDOM.render(<BrowserRouter><App></App></BrowserRouter>, document.getElementsByClassName("root")[0]);