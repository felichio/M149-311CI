import React from "react";


export default props => {
    const [showClassName, hideClassName] = ["popup--show", "popup--hide"];
    return <div className={`popup ${props.show ? showClassName : hideClassName}`}>
        <p>{props.text}</p>
    </div>;
};