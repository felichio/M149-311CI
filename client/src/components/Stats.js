import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Background from "./Background";


function Stats(props) {
    const requests = props.requests;
    

    return <div className="stats">
        <Background class="back__font"></Background>
        <h1 className="head__primary">Chicago Incidents</h1>
        <div className="stats__container">
            <p>Welcome,</p>
            <p>There are currently <span className="stats__info">{requests.total}</span> issues recorded</p>
            <p><span className="stats__info">{requests.closed}</span> of them are closed</p>
            <p><span className="stats__info">{requests.opened}</span> of them are open</p>
        </div>
        <div className="link__group">
            <Link to="/login" className="link__group--link">Login</Link>
            <Link to="/register" className="link__group--link">Register</Link>
        </div>
    </div>
}


export default Stats;