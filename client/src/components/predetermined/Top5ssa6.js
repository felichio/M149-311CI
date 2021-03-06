import React, { useState } from "react";
import axios from "axios";
import retrieveTokenFromLocal from "../../util/retrieveTokenFromLocal";
import withLoading from "../withLoading";
import LogTable from "../tables/LogTable";


const Top5ssa6 = props => {

    const [creationDate, setCreationDate] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonState, setButtonState] = useState(true);
    const [isInitState, setIsInitState] = useState(true);

    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableData, setTableData] = useState([]);

    const getResults = () => {

        const data = {creationDate, completionDate};
        const token = retrieveTokenFromLocal();
        setButtonState(false);
        setIsLoading(true);
        setIsInitState(false);
        axios.get("/api/predetermined/6", {
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
                props.setTextAndShowPopup("Fetched Results for query no.6");
                
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
    }



    return <>
        <div className="TotalRequestsPerType1">
            <form className="TotalRequestsPerType1__form">
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="creatd">Creation Date</label>
                    <input type="date" id="creatd" onChange={ev => setCreationDate(ev.target.value)}></input>
                </div>
                <div className="TotalRequestsPerType1__form--group">
                    <label htmlFor="compd">Completion Date</label>
                    <input type="date" id="compd" onChange={ev => setCompletionDate(ev.target.value)}></input>
                </div>
            </form>
            <button className="TotalRequestsPerType1__button" onClick={getResults} disabled={!buttonState}>Get Results</button>
        </div>
        {isInitState || withLoading(LogTable)({isLoading, data: {header: tableHeaders, data: tableData}, ...props}) }
    </>

    
};


export default Top5ssa6;