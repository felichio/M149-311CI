import React, { useMemo } from "react";
import {useTable, usePagination} from "react-table";

const LogTable = props => {

    const columns = useMemo(() => props.data.header);
    const data = useMemo(() => props.data.data);

    const tableInstance = useTable({
        columns,
        data
    }, usePagination);


    const {getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, prepareRow, canNextPage, canPreviousPage, pageOptions, state} = tableInstance;
    
    return <div className="logtable__container">
        <div className="logtable__table">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(col => <th {...col.getHeaderProps()}>{col.render("Header")}</th>)}
                    </tr>)}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return <tr {...row.getRowProps()}>{row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render("Cell")}</td>)}</tr>
                    })}
                </tbody>
            </table>
            <div className="pagination__buttons">
                <p className="page__index">Page <strong>{state.pageIndex + 1}</strong> of {pageOptions.length}</p>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="pagination__button">prev</button>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="pagination__button">next</button>
            </div>
        </div>
    </div>
};



export default LogTable;



