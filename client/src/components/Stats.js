import React from "react";
import {Link} from "react-router-dom";
import Background from "./Background";


function Stats(props) {


    return <div className="stats">
        <Background class="back__font"></Background>
        <h1 className="head__primary">Chicago Incidents</h1>
        <div className="stats__container">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus et sint ad numquam nemo cum, pariatur, tempora sit alias a necessitatibus eius velit error minima fugiat ut incidunt provident molestiae?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus et sint ad numquam nemo cum, pariatur, tempora sit alias a necessitatibus eius velit error minima fugiat ut incidunt provident molestiae?</p>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus et sint ad numquam nemo cum, pariatur, tempora sit alias a necessitatibus eius velit error minima fugiat ut incidunt provident molestiae?</p>
        </div>
        <div className="link__group">
            <Link to="/login" className="link__group--link">Login</Link>
            <Link to="/register" className="link__group--link">Register</Link>
        </div>
    </div>
}


export default Stats;