import axios from "axios";
import React, {useMemo, useState} from "react";
import {types} from "../../../database/config/config";
import retrieveTokenFromLocal from "../util/retrieveTokenFromLocal";



const InsertIncident = props => {
    const [typeOfService, setTypeOfService] = useState("Abandoned Vehicle Complaint");
    const [creationDate, setCreationDate] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [status, setStatus] = useState("Completed");
    const [service, setService] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [xycoord, setxycoord] = useState({xcoord: "", ycoord: ""});
    const [point1, setPoint1] = useState({lat: "", lon: ""});

    const [ward, setWard] = useState("");
    const [policeDistrict, setPoliceDistrict] = useState("");
    const [communityArea, setCommunityArea] = useState("");

    const [historicalWards, setHistoricalWards] = useState("");
    const [zipCodes, setZipCodes] = useState("");
    const [communityAreas, setCommunityAreas] = useState("");
    const [censusTracts, setCensusTracts] = useState("");
    const [wards, setWards] = useState("");

    // Abandoned Vehicle
    const [licensePlate, setLicensePlate] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [currentActivity, setCurrentActivity] = useState("");
    const [mostRecentAction, setMostRecentAction] = useState("");
    const [daysAsParked, setDaysAsParked] = useState("");
    const [ssa, setSsa] = useState("");


    // Garbage
    const [numberOfBlackCarts, setNumberOfBlackCarts] = useState("");
    const [mostRecentActivity, setMostRecentActivity] = useState("");

    // Graffiti
    const [surfaceIsTheGraffitOn, setSurfaceIsTheGraffitiOn] = useState("");
    const [whereIsTheGraffitiLocated, setWhereIsTheGraffitiLocated] = useState("");

    // Pot holes
    const [numberOfPotHolesFilled, setNumberOfPotHolesFilled] = useState("");


    // Rodent
    const [numberOfPremises, setNumberOfPremises] = useState("");
    const [numberOfPremisesGarbage, setNumberOfPremisesGarbage] = useState("");
    const [numberOfPremisesRats, setNumberOfPremisesRats] = useState("");
    
    // Sanitation
    const [natureOfCodeViolation, setNatureOfCodeViolation] = useState("");

    // Tree Debris
    const [whereIsTheDebrisLocated, setWhereIsTheDebrisLocated] = useState("");

    // Tree Trims
    const [locationOfTrees, setLocationOfTrees] = useState("");

    const [buttonEnabled, setButtonEnabled] = useState(true);

    const fieldsPerType = type => {
        switch (type) {
            case types.abandonedVehicle:
                return ({
                    licensePlate,
                    vehicleModel,
                    vehicleColor,
                    currentActivity,
                    mostRecentAction,
                    daysAsParked,
                    ssa
                });
            case types.alleyLightsOut:
                return ({

                });
            case types.garbageCarts:
                return ({
                    numberOfBlackCarts,
                    currentActivity,
                    mostRecentActivity,
                    ssa,
                });
            case types.graffitiRemoval:
                return ({
                    surfaceIsTheGraffitOn,
                    whereIsTheGraffitiLocated,
                    ssa,
                });
            case types.potHoles:
                return ({
                    currentActivity,
                    mostRecentActivity,
                    numberOfPotHolesFilled,
                    ssa
                })
            case types.rodentBaiting:
                return ({
                    numberOfPremises,
                    numberOfPremisesGarbage,
                    numberOfPremisesRats,
                    currentActivity,
                    mostRecentActivity
                });
            case types.sanitationCode:
                return ({
                    natureOfCodeViolation,
                });
            case types.treeDebris:
                return ({
                    whereIsTheDebrisLocated,
                    currentActivity,
                    mostRecentActivity,
                });
            case types.treeTrims:
                return ({
                    locationOfTrees
                });
        };
    };

    const sendData = () => {
        const data = {
            typeOfService,
            creationDate,
            completionDate,
            status,
            service,
            streetAddress,
            zipCode,
            xycoord,
            point1,
            ward,
            policeDistrict,
            communityArea,
            historicalWards,
            zipCodes,
            communityAreas,
            censusTracts,
            wards,
            ...fieldsPerType(typeOfService)
        };
        const token = retrieveTokenFromLocal();
        console.log(data);
        setButtonEnabled(false);
        axios.post("/api/incident", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setButtonEnabled(true);
            if (!res.data.error) {
                props.setTextAndShowPopup(`Inserted request with id ${res.data.success}`);
            }
        }).catch(e => {
            setButtonEnabled(true);
            props.setTextAndShowPopup("Something went wrong");
        });
        
    }

    const statusValues = useMemo(() => [
        "Completed",
        "Completed - Dup",
        "Open",
        "Open - Dup"
    ],[]);

    return <div className="TotalRequestsPerType1">
        <form className="TotalRequestsPerType1__form">
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="types">Type of Service</label>
                <select id="types" name="types" onChange={ev => setTypeOfService(ev.target.value)}>
                    {Object.keys(types).map(type => <option key={type} value={types[type]}>{types[type]}</option>)}
                </select>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" onChange={ev => setStatus(ev.target.value)}>
                    {statusValues.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="service">Service Request N.</label>
                <input type="text" id="service" maxLength="12" onChange={ev => setService(ev.target.value)}></input>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="creatd">Creation Date</label>
                <input type="date" id="creatd" onChange={ev => setCreationDate(ev.target.value)}></input>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="compd">Completion Date</label>
                <input type="date" id="compd" onChange={ev => setCompletionDate(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                    <p className="TotalRequestsPerType1__form--group--coordslabel">Xcoord-Ycoord</p>
                    <label htmlFor="p1lat">X-coord</label>
                    <input type="number" step="any" id="p1lat"  onChange={ev => setxycoord(prev => ({
                        ...prev,
                        xcoord: ev.target.value
                    }))}></input>
                    <label htmlFor="p1lon">Y-coord</label>
                    <input type="number" step="any" id="p1lon"  onChange={ev => setxycoord(prev => ({
                        ...prev,
                        ycoord: ev.target.value
                    }))}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                    <p className="TotalRequestsPerType1__form--group--coordslabel">Geo Location</p>
                    <label htmlFor="p1lat">Latitude</label>
                    <input type="number" step="any" id="p1lat" min="-90" max="90" onChange={ev => setPoint1(prev => ({
                        ...prev,
                        lat: ev.target.value
                    }))}></input>
                    <label htmlFor="p1lon">Longitude</label>
                    <input type="number" step="any" id="p1lon" min="-180" max="180" onChange={ev => setPoint1(prev => ({
                        ...prev,
                        lon: ev.target.value
                    }))}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="street">Street Address</label>
                <input type="text" id="street" onChange={ev => setStreetAddress(ev.target.value)}></input>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="zip">Zip Code</label>
                <input className="input--small" type="text" id="zip" maxLength={5} onChange={ev => setZipCode(ev.target.value)}></input>
            </div>

            

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Ward</label>
                <input className="input--small" type="text" id="ward" maxLength="2" onChange={ev => setWard(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="police">Police District</label>
                <input className="input--small" type="text" id="police" maxLength="2" onChange={ev => setPoliceDistrict(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="community">Community Area</label>
                <input className="input--small" type="text" id="community" maxLength="2" onChange={ev => setCommunityArea(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="hward">Historical Wards</label>
                <input className="input--small" type="text" id="hward" maxLength="2" onChange={ev => setHistoricalWards(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="zcode">Zip Codes</label>
                <input className="input--small" type="text" id="zcode" maxLength="5" onChange={ev => setZipCodes(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Community Areas</label>
                <input className="input--small" type="text" id="ward" maxLength="2" onChange={ev => setCommunityAreas(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Census Tracts</label>
                <input className="input--small" type="text" id="ward" maxLength="3" onChange={ev => setCensusTracts(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Wards</label>
                <input className="input--small" type="text" id="ward" maxLength="2" onChange={ev => setWards(ev.target.value)}></input>
            </div>

            {typeOfService === types["abandonedVehicle"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="plate">License Plate</label>
                    <input className="input--small" type="text" id="plate" value={licensePlate} onChange={ev => setLicensePlate(ev.target.value)}></input>
                </div>

                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="model">Vehicle Model</label>
                    <input className="input--small" type="text" id="model" value={vehicleModel} onChange={ev => setVehicleModel(ev.target.value)}></input>
                </div>

                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="color">Vehicle Color</label>
                    <input className="input--small" type="text" id="color" value={vehicleColor} onChange={ev => setVehicleColor(ev.target.value)}></input>
                </div>

                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="activity">Current Activity</label>
                    <input type="text" id="activity" value={currentActivity} onChange={ev => setCurrentActivity(ev.target.value)}></input>
                </div>

                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="ward">Most Recent Action</label>
                    <input type="text" id="ward" value={mostRecentAction} onChange={ev => setMostRecentAction(ev.target.value)}></input>
                </div>

                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="park">Days as Parked</label>
                    <input className="input--small" value={daysAsParked} type="number" id="park" onChange={ev => setDaysAsParked(ev.target.value)}></input>
                </div>

                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="ssa">SSA</label>
                    <input className="input--small" value={ssa} type="text" maxLength="2" id="ssa" onChange={ev => setSsa(ev.target.value)}></input>
                </div>
            </> : undefined}
            {typeOfService === types["alleyLightsOut"] ? <></> : undefined}
            {typeOfService === types["garbageCarts"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="blackcarts">Number of Black Carts Delivered</label>
                        <input type="number" value={numberOfBlackCarts} id="blackcarts" onChange={ev => setNumberOfBlackCarts(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="activity">Current Activity</label>
                    <input type="text" id="activity" value={currentActivity} onChange={ev => setCurrentActivity(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="ractivity">Most Recent Activity</label>
                        <input type="text" id="ractivity" value={mostRecentActivity} onChange={ev => setMostRecentActivity(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="ssa">SSA</label>
                    <input className="input--small" value={ssa} type="text" maxLength="2" id="ssa" onChange={ev => setSsa(ev.target.value)}></input>
                </div>

            </> : undefined}
            {typeOfService === types["graffitiRemoval"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="surface">Surface is the graffiti on</label>
                    <input type="text" id="surface" value={surfaceIsTheGraffitOn} onChange={ev => setSurfaceIsTheGraffitiOn(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="glocation">Where is the graffiti located</label>
                    <input type="text" id="glocation" value={whereIsTheGraffitiLocated} onChange={ev => setWhereIsTheGraffitiLocated(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="ssa">SSA</label>
                    <input className="input--small" value={ssa} type="text" maxLength="2" id="ssa" onChange={ev => setSsa(ev.target.value)}></input>
                </div>
            </> : undefined}
            {typeOfService === types["potHoles"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="activity">Current Activity</label>
                    <input type="text" id="activity" value={currentActivity} onChange={ev => setCurrentActivity(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="ractivity">Most Recent Activity</label>
                        <input type="text" id="ractivity" value={mostRecentActivity} onChange={ev => setMostRecentActivity(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="potholes">Number of Pot holes filled</label>
                        <input className="input--small" value={numberOfPotHolesFilled} type="number" id="potholes" onChange={ev => setNumberOfPotHolesFilled(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="ssa">SSA</label>
                    <input className="input--small" type="text" value={ssa} maxLength="2" id="ssa" onChange={ev => setSsa(ev.target.value)}></input>
                </div>
            </> : undefined}
            {typeOfService === types["rodentBaiting"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="potholes">Number of Premises baited</label>
                        <input className="input--small" value={numberOfPremises} type="number" id="potholes" onChange={ev => setNumberOfPremises(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="potholes">Number of Premises with Garbage</label>
                        <input className="input--small" value= {numberOfPremisesGarbage} type="number" id="potholes" onChange={ev => setNumberOfPremisesGarbage(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="potholes">Number of Premises with Rats</label>
                        <input className="input--small" value={numberOfPremisesRats} type="number" id="potholes" onChange={ev => setNumberOfPremisesRats(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="activity">Current Activity</label>
                    <input type="text" id="activity" value={currentActivity} onChange={ev => setCurrentActivity(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="ractivity">Most Recent Activity</label>
                        <input type="text" id="ractivity" value={mostRecentActivity} onChange={ev => setMostRecentActivity(ev.target.value)}></input>
                </div>
            </> : undefined}
            {typeOfService === types["sanitationCode"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="codeviolation">Nature of Code Violations</label>
                    <input type="text" id="codeviolation" value={natureOfCodeViolation} onChange={ev => setNatureOfCodeViolation(ev.target.value)}></input>
                </div>
            </> : undefined}
            {typeOfService === types["streetLightsAllOut"] ? <></> : undefined}
            {typeOfService === types["streetLightsOneOut"] ? <></> : undefined}
            {typeOfService === types["treeDebris"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="debris">Where is the debris located</label>
                    <input type="text" id="debris" value={whereIsTheDebrisLocated} onChange={ev => setWhereIsTheDebrisLocated(ev.target.value)}></input>
                </div> 
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="activity">Current Activity</label>
                    <input type="text" id="activity" value={currentActivity} onChange={ev => setCurrentActivity(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                        <label htmlFor="ractivity">Most Recent Activity</label>
                        <input type="text" id="ractivity" value={mostRecentActivity} onChange={ev => setMostRecentActivity(ev.target.value)}></input>
                </div>
            </> : undefined}
            {typeOfService === types["treeTrims"] ? <>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="trims">Location of Trees</label>
                    <input type="text" id="trims" value={locationOfTrees} onChange={ev => setLocationOfTrees(ev.target.value)}></input>
                </div> 
            </> : undefined}

            
        </form>
        <button className="TotalRequestsPerType1__button" onClick={sendData} disabled={!buttonEnabled}>Insert Incident</button>
    </div>
};



export default InsertIncident;