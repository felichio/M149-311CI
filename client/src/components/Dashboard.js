import React, { useState } from "react";
import { useRouteMatch } from "react-router";
import {Route, Link} from "react-router-dom";
import Navigation from "./Navigation";
import UpdateUser from "./UpdateUser";
import Sidebar from "./Sidebar";


function Dashboard (props) {
    
    const [visibleComponents, setVisibleComponents] = useState({
        updateUser: false,

    });



    return <>
        <Navigation profile={props.profile} setVisibleComponents={setVisibleComponents}></Navigation>
        {visibleComponents.updateUser ? <UpdateUser profile={props.profile}></UpdateUser>: undefined}
        <Sidebar></Sidebar>
    </>
};


export default Dashboard;