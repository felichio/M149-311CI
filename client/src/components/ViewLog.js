import React, { useEffect, useRef, useState } from "react";
import withLoading from "./withLoading";
import LogTable from "./tables/LogTable";
import axios from "axios";
import retrieveTokenFromLocal from "../util/retrieveTokenFromLocal";

const ViewLog = props => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

    console.log(tableHeaders);
    console.log(tableData);
    const getData = () => {
        const token = retrieveTokenFromLocal();
        axios.get("/api/log", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (!res.data.error) {
                props.setTextAndShowPopup("Fetched Log Table");
                setTableHeaders(() => res.data.fields.map(fobj => ({
                    Header: fobj.name,
                    accessor: fobj.name
                })));
                setTableData(() => res.data.rows);
                setIsLoading(false);
            }
            console.log(res.data);
        });
    }

    
    
    return <>
        {withLoading(LogTable)({isLoading, data: {header: tableHeaders, data: tableData}, ...props})}
    </>
};


export default ViewLog;