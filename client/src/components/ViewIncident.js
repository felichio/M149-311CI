import React, { useState } from "react";
import axios from "axios";
import retrieveTokenFromLocal from "../util/retrieveTokenFromLocal";
import withLoading from "./withLoading";
import LogTable from "./tables/LogTable";


const ViewIncident = props => {
    const [isInitState, setIsInitState] = useState(true);
    const [fetchButton, setFetchButton] = useState(true);
    const [request, setRequest] = useState("");
    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

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
                setIsInitState(false);
                setTableHeaders(() => Object.keys(data).map(key => ({
                    Header: key,
                    accessor: key
                })));
                setTableData(() => [data]);
            } else {
                setIsInitState(true);
                props.setTextAndShowPopup("Request not found");
            }
        }).catch(() => setFetchButton(true));
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
        {isInitState || withLoading(LogTable)({isLoading, data: {header: tableHeaders, data: tableData}, ...props}) }
    </>
};



export default ViewIncident;