import React, {useState} from "react";
import { useHistory } from "react-router";



const Sidebar = props => {

    let history = useHistory();
    
    const setVisibleComponent = id => props.setVisibleComponents(prev => prev.map((_, i) => i === id));

    const signOut = () => {
                window.localStorage.removeItem("_token");
                props.setProfile(prev => ({
                    id: null,
                    username: null,
                    email: null,
                    isAuthenticated: false
                }));
                history.push("/");
    };


    return <div className="sidebar">
        <ul className="sidebar__item-container">
            <li className={`sidebar__item-container--item ${props.visibleComponents[0] ? "sidebar__item-container--item--active" : ""}`} onClick={ev => setVisibleComponent(0)}>Run predetermined queries</li>
            <li className={`sidebar__item-container--item ${props.visibleComponents[1] ? "sidebar__item-container--item--active" : ""}`} onClick={ev => setVisibleComponent(1)}>View Incidents</li>
            <li className={`sidebar__item-container--item ${props.visibleComponents[2] ? "sidebar__item-container--item--active" : ""}`} onClick={ev => setVisibleComponent(2)}>Insert an incident</li>
            <li className={`sidebar__item-container--item ${props.visibleComponents[3] ? "sidebar__item-container--item--active" : ""}`} onClick={ev => setVisibleComponent(3)}>Update an incident</li>
            <li className={`sidebar__item-container--item ${props.visibleComponents[4] ? "sidebar__item-container--item--active" : ""}`} onClick={ev => setVisibleComponent(4)}>Delete an incident</li>
            <li className={`sidebar__item-container--item ${props.visibleComponents[5] ? "sidebar__item-container--item--active" : ""}`} onClick={ev => setVisibleComponent(5)}>View log</li>
        </ul>
        <li className="sidebar__item-container--item" onClick={signOut}>Sign out</li>
    </div>
};



export default Sidebar;
