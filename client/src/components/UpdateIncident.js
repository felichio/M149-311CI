import React, {useState, useMemo} from "react";
import axios from "axios";
import {types} from "../../../database/config/config";
import moment from "moment";
import retrieveTokenFromLocal from "../util/retrieveTokenFromLocal";


const UpdateIncident = props => {

    const [fetchButton, setFetchButton] = useState(true);
    const [updateButton, setUpdateButton] = useState(true);
    const [deleteButton, setDeleteButton] = useState(true);

    const [request, setRequest] = useState("");


   
    const [stableRequest, setStableRequest] = useState("");
    const [stableIncident, setStableIncident] = useState("");
    const [typeOfService, setTypeOfService] = useState("");
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


    const statusValues = useMemo(() => [
        "Completed",
        "Completed - Dup",
        "Open",
        "Open - Dup"
    ],[]);

    const clearData = () => {
        setRequest("");
        setStableRequest("");
        setStableIncident("");
        setTypeOfService("");
        setCreationDate("");
        setCompletionDate("");
        setService("");
        setStreetAddress("");
        setZipCode({xcoord: "", ycoord: ""});
        setPoint1({lat: "", lon: ""});
        setWard("");
        setPoliceDistrict("");
        setCommunityArea("");
        setHistoricalWards("");
        setZipCodes("");
        setCommunityAreas("");
        setCensusTracts("");
        setWards("");
        setLicensePlate("");
        setVehicleModel("");
        setVehicleColor("");
        setCurrentActivity("");
        setMostRecentAction("");
        setDaysAsParked("");
        setSsa("");
        setNumberOfBlackCarts("");
        setMostRecentActivity("");
        setSurfaceIsTheGraffitiOn("");
        setWhereIsTheGraffitiLocated("");
        setNumberOfPotHolesFilled("");
        setNumberOfPremises("");
        setNumberOfPremisesGarbage("");
        setNumberOfPremisesRats("");
        setNatureOfCodeViolation("");
        setWhereIsTheDebrisLocated("");
        setLocationOfTrees("");
    }

    const changeState = (type, data) => {
        setStableRequest(data.request_id || "");
        setStableIncident(data.incident_id || "");
        setCreationDate(data.creation_date ? moment(data.creation_date).format("YYYY-MM-DD") : "");
        
        setCompletionDate(data.completion_date ? moment(data.completion_date).format("YYYY-MM-DD") : "");
        setStatus(data.status);
        setService(data.service_request_number || "");
        setStreetAddress(data.street_address || "");
        setZipCode(data.zip_code || "");
        setxycoord({
            xcoord: data.xcoord || "",
            ycoord: data.ycoord || ""
        });
        setPoint1({
            lat: data.latitude || "",
            lon: data.longitude || ""
        });
        setWard(data.ward || "");
        setPoliceDistrict(data.police_district || "");
        setCommunityArea(data.community_area || "");

        setHistoricalWards(data.historical_wards || "");
        setZipCodes(data.zip_codes || "");
        setCommunityAreas(data.community_areas || "");
        setCensusTracts(data.census_tracts || "");
        setWards(data.wards || "");

        switch (type) {
            case types.abandonedVehicle:
                setLicensePlate(data.license_plate || "");
                setVehicleModel(data.vehicle_model || "");
                setVehicleColor(data.vehicle_color || "");
                setCurrentActivity(data.current_activity || "");
                setMostRecentAction(data.most_recent_action || "");
                setDaysAsParked(data.days_as_parked || "");
                setSsa(data.ssa || "");
                break;
            case types.garbageCarts:
                setNumberOfBlackCarts(data.number_of_black_carts_delivered || "");
                setCurrentActivity(data.current_activity || "");
                setMostRecentActivity(data.most_recent_activity || "");
                setSsa(data.ssa || "");
                break;
            case types.graffitiRemoval:
                setSurfaceIsTheGraffitiOn(data.surface_is_the_graffiti_on || "");
                setWhereIsTheGraffitiLocated(data.where_is_the_graffiti_located || "");
                setSsa(data.ssa || "");
                break;
            case types.potHoles:
                setNumberOfPotHolesFilled(data.number_of_potholes_filled_on_block || "");
                setCurrentActivity(data.current_activity || "");
                setMostRecentActivity(data.most_recent_activity || "");
                setSsa(data.ssa || "");
                break;
            case types.rodentBaiting:
                setNumberOfPremises(data.number_of_premises_baited || "");
                setNumberOfPremisesGarbage(data.number_of_premises_with_garbage || "");
                setNumberOfPremisesRats(data.number_of_premises_with_rats || "");
                setCurrentActivity(data.current_activity || "");
                setMostRecentActivity(data.most_recent_activity || "");
                break;
            case types.sanitationCode:
                setNatureOfCodeViolation(data.nature_of_code_violations || "");
                break;
            case types.treeDebris:
                setCurrentActivity(data.current_activity || "");
                setMostRecentActivity(data.most_recent_activity || "");
                setWhereIsTheDebrisLocated(data.where_is_the_debris_located || "");
                break;
            case types.treeTrims:
                setLocationOfTrees(data.location_of_trees || "");
                break;
        };
    };

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

    const fetchRequest = () => {
        const token = retrieveTokenFromLocal();
        setFetchButton(false);
        axios.get(`/api/incident/${request || -1}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setFetchButton(true);
            console.log(res);
            if (!res.data.error) {
                const data = res.data;
                setTypeOfService(data.type_of_service);
                changeState(data.type_of_service, data);
            } else {
                props.setTextAndShowPopup("Request not found");
            }
        }).catch(() => setFetchButton(true));
    };


    const updateRequest = () => {
        const data = {
            stableIncident,
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
        setUpdateButton(false);

        axios.post(`/api/incident/${stableRequest || -1}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setUpdateButton(true);
            console.log(res);
            if (!res.data.error) {
                props.setTextAndShowPopup(`Updated request with id ${res.data.success}`);
            } else {
                props.setTextAndShowPopup("Request not updated");
            }
        }).catch(() => setUpdateButton(true));
    };


    const deleteRequest = () => {
        const data = {
            stableIncident,
            typeOfService
        };
        setDeleteButton(false);
        const token = retrieveTokenFromLocal();
        axios.delete(`/api/incident/${stableRequest || -1}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data
        }).then(res => {
            setDeleteButton(true);
            console.log(res);
            if (!res.data.error) {
                props.setTextAndShowPopup(`Deleted request with id ${res.data.success}`);
                clearData();
            } else {
                props.setTextAndShowPopup(res.data.error);
            }
        }).catch(() => setDeleteButton(true));
    };


    return <>
        <div className="TotalRequestsPerType1">
            <form className="TotalRequestsPerType1__form">
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="reqid">Request id</label>
                    <input type="text" id="reqid" value={request} onChange={ev => setRequest(ev.target.value)}></input>
                </div>
            </form>
            <button className="TotalRequestsPerType1__button" disabled={!fetchButton} onClick={fetchRequest}>Fetch Request</button>
        </div>
        <div className="TotalRequestsPerType1">
        <form className="TotalRequestsPerType1__form">
            {typeOfService && <>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="type">Type of Service</label>
                <input type="text" id="type" value={typeOfService} disabled={true}></input>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={status} onChange={ev => setStatus(ev.target.value)}>
                    {statusValues.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>
            
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="service">Service Request N.</label>
                <input type="text" id="service" value={service} maxLength="12" onChange={ev => setService(ev.target.value)}></input>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="creatd">Creation Date</label>
                <input type="date" id="creatd" value={creationDate} onChange={ev => setCreationDate(ev.target.value)}></input>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="compd">Completion Date</label>
                <input type="date" id="compd" value={completionDate} onChange={ev => setCompletionDate(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                    <p className="TotalRequestsPerType1__form--group--coordslabel">Xcoord-Ycoord</p>
                    <label htmlFor="p1lat">X-coord</label>
                    <input type="number" step="any" id="p1lat" value={xycoord.xcoord}  onChange={ev => setxycoord(prev => ({
                        ...prev,
                        xcoord: ev.target.value
                    }))}></input>
                    <label htmlFor="p1lon">Y-coord</label>
                    <input type="number" step="any" id="p1lon" value={xycoord.ycoord}  onChange={ev => setxycoord(prev => ({
                        ...prev,
                        ycoord: ev.target.value
                    }))}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                    <p className="TotalRequestsPerType1__form--group--coordslabel">Geo Location</p>
                    <label htmlFor="p1lat">Latitude</label>
                    <input type="number" step="any" id="p1lat" min="-90" max="90" value={point1.lat} onChange={ev => setPoint1(prev => ({
                        ...prev,
                        lat: ev.target.value
                    }))}></input>
                    <label htmlFor="p1lon">Longitude</label>
                    <input type="number" step="any" id="p1lon" min="-180" max="180" value={point1.lon} onChange={ev => setPoint1(prev => ({
                        ...prev,
                        lon: ev.target.value
                    }))}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="street">Street Address</label>
                <input type="text" id="street" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}></input>
            </div>
            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="zip">Zip Code</label>
                <input className="input--small" value={zipCode} type="text" id="zip" maxLength={5} onChange={ev => setZipCode(ev.target.value)}></input>
            </div>

            

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Ward</label>
                <input className="input--small" value={ward} type="text" id="ward" maxLength="2" onChange={ev => setWard(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="police">Police District</label>
                <input className="input--small" value={policeDistrict} type="text" id="police" maxLength="2" onChange={ev => setPoliceDistrict(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="community">Community Area</label>
                <input className="input--small" value={communityArea} type="text" id="community" maxLength="2" onChange={ev => setCommunityArea(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="hward">Historical Wards</label>
                <input className="input--small" value={historicalWards} type="text" id="hward" maxLength="2" onChange={ev => setHistoricalWards(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="zcode">Zip Codes</label>
                <input className="input--small" value={zipCodes} type="text" id="zcode" maxLength="5" onChange={ev => setZipCodes(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Community Areas</label>
                <input className="input--small" value={communityAreas} type="text" id="ward" maxLength="2" onChange={ev => setCommunityAreas(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Census Tracts</label>
                <input className="input--small" value={censusTracts} type="text" id="ward" maxLength="3" onChange={ev => setCensusTracts(ev.target.value)}></input>
            </div>

            <div className="TotalRequestsPerType1__form--group">
                <label htmlFor="ward">Wards</label>
                <input className="input--small" value={wards} type="text" id="ward" maxLength="2" onChange={ev => setWards(ev.target.value)}></input>
            </div></>}

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
        {typeOfService && <>
            <button className="TotalRequestsPerType1__button" disabled={!updateButton} onClick={updateRequest} >Update Incident</button>
            <button className="TotalRequestsPerType1__button" disabled={!deleteButton} onClick={deleteRequest} >Delete Incident</button>
        </>}
    </div></>
};



export default UpdateIncident;