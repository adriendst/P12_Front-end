import React from "react";
import "./employeeList.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Table } from "table-oc";
import 'table-oc/dist/table-oc.css'

function EmployeeList() {
    const employees = useAppSelector((state) => state.employees.employees);

    const columns = {
        firstName: "First Name",
        lastName: "Last Name",
        startDate: "Start Date",
        department: "Department",
        birthDate: "Date of Birth",
        street: "Street",
        city: "City",
        state: "State",
        zipCode: "Zip Code",
    };

    return (
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <Table data={employees} columns={columns} />
            <Link to="/createemployee">Home</Link>
        </div>
    );
}

export default EmployeeList;
