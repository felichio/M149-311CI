import React, {useState} from "react";

import {useHistory} from "react-router-dom";
import Background from "./Background";


function Login(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordconfirm, setPasswordconfirm] = useState("");


    let history = useHistory();
    
    const back = ev => {
        ev.preventDefault();
        history.push("/");
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
                <button className="form__group__buttons--button">Register</button>
                <button className="form__group__buttons--button" onClick={back}>Back</button>
            </div>
        </form>
    </>
}

export default Login;