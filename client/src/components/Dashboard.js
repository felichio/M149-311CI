import React, { useState } from "react";
import { useRouteMatch } from "react-router";
import {Route, Link} from "react-router-dom";
import Navigation from "./Navigation";
import UpdateUser from "./UpdateUser";
import Sidebar from "./Sidebar";
import PredeterminedQueries from "./PredeterminedQueries";


function Dashboard (props) {
    
    const [visibleComponents, setVisibleComponents] = useState([
        false, // predeterminedQueries
        false, // viewIncidents
        false, // insertIncident
        false, // updateIncident
        false, // deleteIncident
        false, // viewLog
        false, // updateUser
    ]);



    return <>
        <Navigation profile={props.profile} setProfile={props.setProfile} setVisibleComponents={setVisibleComponents}></Navigation>
        {visibleComponents[6] ? <UpdateUser profile={props.profile} setProfile={props.setProfile}></UpdateUser>: undefined}
        {visibleComponents[0] ? <PredeterminedQueries></PredeterminedQueries> : undefined}
        <Sidebar setProfile={props.setProfile} visibleComponents={visibleComponents} setVisibleComponents={setVisibleComponents}></Sidebar>
    </>
};


export default Dashboard;