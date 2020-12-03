import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import {Route, Link} from "react-router-dom";
import Navigation from "./Navigation";
import UpdateUser from "./UpdateUser";
import Sidebar from "./Sidebar";
import PredeterminedQueries from "./PredeterminedQueries";
import ViewLog from "./ViewLog";
import Minpopup from "./Minpopup";

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

    const [visiblePopUp, setVisiblePopUp] = useState(false);
    const [textPopUp, setTextPopUp] = useState("");

    useEffect(() => {
        const id = setTimeout(() => {
            setVisiblePopUp(() => false)
        }, 2000);
        
        return () => clearTimeout(id);
        
    }, [visiblePopUp]);

    

    
    const setTextAndShowPopup = text => {
        setVisiblePopUp(() => true);
        setTextPopUp(() => text);
    };



    return <>
        <Navigation profile={props.profile} setProfile={props.setProfile} setVisibleComponents={setVisibleComponents}></Navigation>
        {visibleComponents[6] ? <UpdateUser profile={props.profile} setProfile={props.setProfile}></UpdateUser>: undefined}
        {visibleComponents[0] ? <PredeterminedQueries setTextAndShowPopup={setTextAndShowPopup}></PredeterminedQueries> : undefined}
        {visibleComponents[5] ? <ViewLog setTextAndShowPopup={setTextAndShowPopup}></ViewLog> : undefined}
        <Sidebar setProfile={props.setProfile} visibleComponents={visibleComponents} setVisibleComponents={setVisibleComponents}></Sidebar>
        <Minpopup show={visiblePopUp} text={textPopUp}></Minpopup>
    </>
};


export default Dashboard;