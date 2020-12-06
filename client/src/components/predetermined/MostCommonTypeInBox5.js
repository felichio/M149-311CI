import React, { useState } from "react";
import axios from "axios";
import retrieveTokenFromLocal from "../../util/retrieveTokenFromLocal";
import withLoading from "../withLoading";
import LogTable from "../tables/LogTable";


const MostCommonTypeInBox5 = props => {

    const [creationDate, setCreationDate] = useState("");
    const [point1, setPoint1] = useState({lat: "", lon: ""});
    const [point2, setPoint2] = useState({lat: "", lon: ""});

    const [isLoading, setIsLoading] = useState(false);
    const [buttonState, setButtonState] = useState(true);
    const [isInitState, setIsInitState] = useState(true);

    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableData, setTableData] = useState([]);

    const getResults = () => {

        const data = {creationDate, point1, point2};
        const token = retrieveTokenFromLocal();
        setButtonState(false);
        setIsLoading(true);
        setIsInitState(false);
        axios.get("/api/predetermined/5", {
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
                props.setTextAndShowPopup("Fetched Results for query no.5");
                
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
                    <p className="TotalRequestsPerType1__form--group--coordslabel">Point 1</p>
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
                    <p className="TotalRequestsPerType1__form--group--coordslabel">Point 2</p>
                    <label htmlFor="p2lat">Latitude</label>
                    <input type="number" step="any" id="p2lat" min="-90" max="90"onChange={ev => setPoint2(prev => ({
                        ...prev,
                        lat: ev.target.value
                    }))}></input>
                    <label htmlFor="p2lon">Longitude</label>
                    <input type="number" step="any" id="p2lon" min="-180" max="180" onChange={ev => setPoint2(prev => ({
                        ...prev,
                        lon: ev.target.value
                    }))}></input>
                </div>
            </form>
            <button className="TotalRequestsPerType1__button" onClick={getResults} disabled={!buttonState}>Get Results</button>
        </div>
        {isInitState || withLoading(LogTable)({isLoading, data: {header: tableHeaders, data: tableData}, ...props}) }
    </>
};


export default MostCommonTypeInBox5;