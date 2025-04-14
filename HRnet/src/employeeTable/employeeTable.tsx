import React, { useEffect, useMemo, useState } from "react";
import { SelectOption } from "../createEmployee/createEmployee";
import Input from "../input/input";
import Select from "../select/select";
import "./employeeTable.css";
import Pagination from "./pagination/pagination";

export type TableFilter = {
    column: string;
    filter: string;
};

const Table = ({ data, columns }: { data: any[]; columns: Record<string, string> }) => {
    const [dataTable, setDataTable] = useState<any[]>(data);

    const [search, setSearch] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPagination(1);
    };

    const [rowPerPage, setRowPerPage] = useState<SelectOption>({
        text: "10",
        value: "10",
    });
    const handleRowPerPageChange = (option: SelectOption) => {
        setRowPerPage(option);
        setPagination(1);
    };

    const [pagination, setPagination] = useState(1);

    const filteredRows = useMemo(() => {
        return dataTable.filter((data) =>
            Object.values(data).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, dataTable]);

    const [rangeDataNumber, setRangeDataNumber] = useState<number[]>([0, 0]);

    const paginatedRows = useMemo(() => {
        const rowPerPageValue = Number(rowPerPage.value);
        const paginationValue = pagination;
        setRangeDataNumber([rowPerPageValue * paginationValue - rowPerPageValue, rowPerPageValue * paginationValue]);
        return filteredRows.slice(
            rowPerPageValue * paginationValue - rowPerPageValue,
            rowPerPageValue * paginationValue
        );
    }, [rowPerPage, filteredRows, pagination]);

    const [filter, setFilter] = useState<TableFilter>({ column: "", filter: "" });

    const rows = useMemo(() => {
        return paginatedRows.map((d, index) => (
            <tr key={index}>
                {Object.entries(columns).map((c, index) => {
                    return (
                        <td key={index} className={filter.column === c[0] ? "onFilterColumn" : ""}>
                            {d[c[0]]}
                        </td>
                    );
                })}
            </tr>
        ));
    }, [paginatedRows]);

    const paginationOptions = [
        {
            text: "10",
            value: "10",
        },
        {
            text: "25",
            value: "25",
        },
        {
            text: "50",
            value: "50",
        },
        {
            text: "100",
            value: "100",
        },
    ];

    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        setPageNumber(Math.ceil(filteredRows.length / Number(rowPerPage.value)));
    }, [filteredRows, rowPerPage]);

    const setFiltering = (column: string) => {
        if (filter.column !== column) setFilter({ column: column, filter: "asc" });
        else if (filter.filter === "asc") setFilter({ column: column, filter: "desc" });
        else if (filter.filter === "desc") setFilter({ column: "", filter: "" });
    };

    useEffect(() => {
        if (filter.filter === "asc" || filter.filter === "desc") {
            const sorted = [...data].sort((a, b) => {
                let valA = a[filter.column];
                let valB = b[filter.column];

                let result;
                if (typeof valA === "string") {
                    result = valA.localeCompare(valB);
                } else {
                    result = valA - valB;
                }

                return filter.filter === "asc" ? result : -result;
            });

            setDataTable(sorted);
        } else {
            setDataTable(data);
        }
    }, [filter, data]);

    return (
        <div className="table">
            <div className="tableTopBar">
                <div className="searchSection">
                    <span>Show</span>
                    <Select onChange={handleRowPerPageChange} options={paginationOptions} value={rowPerPage} />
                    <span>entries</span>
                </div>
                <div className="searchSection">
                    <span>Search : </span>
                    <Input type="text" value={search} onChange={handleSearchChange} isClearable={true}/>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {Object.entries(columns).map((c, index) => {
                            return (
                                <th key={index} onClick={() => setFiltering(c[0])}>
                                    <div className="header">
                                        <span className="headerName">{c[1]}</span>
                                        <span className="arrows">
                                            <div
                                                className={
                                                    filter.column === c[0] && filter.filter === "asc"
                                                        ? "filterActive"
                                                        : ""
                                                }
                                            >
                                                ▲
                                            </div>
                                            <div
                                                className={
                                                    filter.column === c[0] && filter.filter === "desc"
                                                        ? "filterActive"
                                                        : ""
                                                }
                                            >
                                                ▼
                                            </div>
                                        </span>
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={100} className="emptyDataMessage">
                                No data available in table
                            </td>
                        </tr>
                    ) : filteredRows.length === 0 ? (
                        <tr>
                            <td colSpan={100} className="emptyDataMessage">
                                No matching records found
                            </td>
                        </tr>
                    ) : (
                        rows
                    )}
                </tbody>
            </table>
            <div className="tableTopBar">
                <div className="searchSection">
                    <span>
                        Showing {data.length === 0 || filteredRows.length === 0 ? 0 : rangeDataNumber[0] + 1} to{" "}
                        {search !== ""
                            ? Number(rowPerPage.value) * pagination > filteredRows.length
                                ? filteredRows.length
                                : Number(rowPerPage.value) * pagination
                            : Number(rowPerPage.value) * pagination > dataTable.length
                            ? dataTable.length
                            : Number(rowPerPage.value) * pagination}{" "}
                        of{" "}
                        {search !== ""
                            ? `${filteredRows.length} entries (filtered from ${dataTable.length} total entries)`
                            : `${dataTable.length} entries`}
                    </span>
                </div>
                <div className="searchSection">
                    <Pagination pageNumber={pageNumber} pagination={pagination} setPagination={setPagination} />
                </div>
            </div>
        </div>
    );
};

export default Table;
