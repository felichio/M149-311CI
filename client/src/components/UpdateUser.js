import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router";


const UpdateUser = props => {
    const [username, setUsername] = useState(props.profile.username);
    const [email, setEmail] = useState(props.profile.email);
    const [password, setPassword] = useState("");
    const [passwordconfirm, setPasswordconfirm] = useState("");
    const [error, setError] = useState(null);
    const [updateButtonEnabled, setUpdateButtonEnabled] = useState(true);

    let history = useHistory();

    useEffect(() => () => setUpdateButtonEnabled(true), []);


    const updateInfo = ev => {
        ev.preventDefault();
        setUpdateButtonEnabled(false);
        const token = window.localStorage.getItem("_token");
        const data = {
            username,
            email,
            password,
            passwordconfirm
        };

        axios.post("/api/updateuser", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.error) {
                setError(res.data.error);
            } else if (res.data.success) {
                setError(null);
                window.localStorage.removeItem("_token");
                props.setProfile(prev => ({
                    id: null,
                    username: null,
                    email: null,
                    isAuthenticated: false
                }));
                history.push("/login");
            }

            setUpdateButtonEnabled(true);
        }).catch(e => {
            setUpdateButtonEnabled(true);
        })

    }

    return <>
        <form action="" className="updateform" autoComplete="off">
            <div className="updateform__group">
                <label htmlFor="username">Username</label>
                <input type="text" className="updateform__group--input" id="username" value={username} onChange={ev => setUsername(ev.target.value)}/>
            </div>
            <div className="updateform__group">
                <label htmlFor="email">Email</label>
                <input type="text" className="updateform__group--input" id="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
            </div>
            <div className="updateform__group">
                <label htmlFor="password">Password</label>
                <input type="password" className="updateform__group--input" id="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            </div>
            <div className="updateform__group">
                <label htmlFor="c_password">Confirm Password</label>
                <input type="password" className="updateform__group--input" id="c_password" value={passwordconfirm} onChange={ev => setPasswordconfirm(ev.target.value)}/>
            </div>
            <div className="updateform__group__buttons">
                <button className="updateform__group__buttons--button" onClick={updateInfo} disabled={!updateButtonEnabled}>Update</button>
                {error ? <div className="error">{error}</div> : undefined} 
            </div>
        </form>
    </>;
};



export default UpdateUser;