import React, { useState } from "react";
import axios from "axios";
import retrieveTokenFromLocal from "../../util/retrieveTokenFromLocal";
import withLoading from "../withLoading";
import LogTable from "../tables/LogTable";
import {types} from "../../../../database/config/config";

const TotalRequestsPerDate2 = props => {

    const [creationDateStart, setCreationDateStart] = useState("");
    const [creationDateEnd, setCreationDateEnd] = useState("");
    const [typeOfService, setTypeOfService] = useState("Abandoned Vehicle Complaint");

    const [isLoading, setIsLoading] = useState(false);
    const [buttonState, setButtonState] = useState(true);
    const [isInitState, setIsInitState] = useState(true);

    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableData, setTableData] = useState([]);

    
    const getResults = () => {
        
        const data = {typeOfService, creationDateStart, creationDateEnd};
        const token = retrieveTokenFromLocal();
        setButtonState(false);
        setIsLoading(true);
        setIsInitState(false);
        axios.get("/api/predetermined/2", {
            params: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setButtonState(true);
            
            setIsLoading(false);
            console.log(res.data);
            if (!res.data.error) {
                props.setTextAndShowPopup("Fetched Results for query no.2");
                
                setTableHeaders(() => res.data.fields.map(fobj => ({
                    Header: fobj.name,
                    accessor: fobj.name
                })));
                setTableData(() => res.data.rows);
            } else {
                props.setTextAndShowPopup("No results");
            }

        }).catch(() => {
            setButtonState(true);
        })
    };


    return <>
        <div className="TotalRequestsPerType1">
            <form className="TotalRequestsPerType1__form">
                <div className="TotalRequestsPerType1__form--group">
                    <label>Type of Service</label>
                    <select id="cars" name="cars" onChange={ev => setTypeOfService(ev.target.value)}>
                        {Object.keys(types).map(type => <option key={type} value={types[type]}>{types[type]}</option>)}
                    </select>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="creatds">Creation Date Start</label>
                    <input type="date" id="creatds" onChange={ev => setCreationDateStart(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="creatde">Creation Date End</label>
                    <input type="date" id="creatde" onChange={ev => setCreationDateEnd(ev.target.value)}></input>
                </div>
            </form>
            <button className="TotalRequestsPerType1__button" onClick={getResults} disabled={!buttonState}>Get Results</button>
        </div>
        {isInitState || withLoading(LogTable)({isLoading, data: {header: tableHeaders, data: tableData}, ...props}) }
    </>

};


export default TotalRequestsPerDate2;