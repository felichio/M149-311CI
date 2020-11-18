import React, {useState} from "react";

import {useHistory} from "react-router-dom";
import Background from "./Background";
import axios from "axios";

function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordconfirm, setPasswordconfirm] = useState("");
    const [error, setError] = useState(null);
    console.log("register");

    let history = useHistory();
    
    const back = ev => {
        ev.preventDefault();
        history.push("/");
    };

    const register = ev => {
        ev.preventDefault();
        
        const data = {
            username,
            email,
            password,
            passwordconfirm
        };

        axios.post("/api/register", data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            if (res.data.error) {
                setError(res.data.error);
                
            } else if (res.data.success) {
                history.push("/login");
            } else {
                setError("Try again later");
            }
            
        })
        

    }


    return <>
        <form action="" className="form" autoComplete="off">
            <Background class="back__font"></Background>
            <div className="form__group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form__group--input" id="username" value={username} onChange={ev => setUsername(ev.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form__group--input" id="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form__group--input" id="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            </div>
            <div className="form__group">
                <label htmlFor="c_password">Confirm Password</label>
                <input type="password" className="form__group--input" id="c_password" value={passwordconfirm} onChange={ev => setPasswordconfirm(ev.target.value)}/>
            </div>
            <div className="form__group__buttons">
                <button className="form__group__buttons--button" onClick={register}>Register</button>
                <button className="form__group__buttons--button" onClick={back}>Back</button>
            </div>
            <div className="form__group">
                {error ? <div className="error">{error}</div> : undefined}  
            </div>
        </form>
    </>
}

export default Register;