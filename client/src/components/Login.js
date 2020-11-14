import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Background from "./Background";
import jwt from "jsonwebtoken";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


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
                // show error
            } else {
                

                const token = res.data.token;
                

                const payload = jwt.decode(token);
                console.log(payload);
                
                
                
                props.setProfile(prev => ({
                    ...prev,
                    username,
                    isAuthenticated: true,
                }));
            }

            

            
        }).catch(e => {console.log(e)});
    }


    return <>
        <form action="" className="form" autoComplete="off">
            <Background class="back__font"></Background>
            <div className="form__group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form__group--input" id="username" value={username} onChange={ev => setUsername(ev.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form__group--input" id="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            </div>
            
            <div className="form__group__buttons">
                <button className="form__group__buttons--button" onClick={login}>Login</button>
                <button className="form__group__buttons--button" onClick={back}>Back</button>
            </div>
        </form>
    </>
}

export default Login;