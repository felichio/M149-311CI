import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Background from "./Background";
import jwt from "jsonwebtoken";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    console.log("login");
    let history = useHistory();
    
    const back = ev => {
        ev.preventDefault();
        history.push("/");
    };

    const login = (ev) => {
        ev.preventDefault();
        const data = {
            username,
            password
        };


        axios.post("/api/login", data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            
            if (res.data.error) {
                setError(res.data.error);
            } else {
                

                const token = res.data.token;
                window.localStorage.setItem("_token", token);

                const payload = jwt.decode(token);
                console.log(payload);
                
                
                
                props.setProfile(prev => ({
                    id: payload.id,
                    username: payload.username,
                    email: payload.email,
                    isAuthenticated: true
                }));

                history.push("/dashboard");
            }

            

            
        }).catch(e => {console.log(e)});
    };

  


    return <>
        <form action="" className="form" autoComplete="off">
            <Background class="back__font"></Background>
            <div className="form__group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form__group--input" id="username" value={username} onChange={ev => {
                    // props.setProfile({username: ev.target.value});
                    setUsername(ev.target.value);
                }}/>
            </div>
            <div className="form__group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form__group--input" id="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            </div>
            
            <div className="form__group__buttons">
                <button className="form__group__buttons--button" onClick={login}>Login</button>
                <button className="form__group__buttons--button" onClick={back}>Back</button>
            </div>
            <div className="form__group">
                {error ? <div className="error">{error}</div> : undefined}  
            </div>
        </form>
    </>
}

export default Login;