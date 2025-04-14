import React, { useState } from "react";
import "./createEmployee.css";
import { Link } from "react-router-dom";
import Input from "../input/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../select/select";
import Popup from "../popup/popup";
import { useAppDispatch } from "../store/hooks";
import { addEmployee } from "../store/slices/employeeSlice";

export type SelectOption = {
    text: string;
    value: string;
};

export const emptyOption = {
    text: "",
    value: "",
};

function CreateEmployee() {
    const states = [
        { text: "Alabama", value: "AL" },
        { text: "Alaska", value: "AK" },
        { text: "American Samoa", value: "AS" },
        { text: "Arizona", value: "AZ" },
        { text: "Arkansas", value: "AR" },
        { text: "California", value: "CA" },
        { text: "Colorado", value: "CO" },
        { text: "Connecticut", value: "CT" },
        { text: "Delaware", value: "DE" },
        { text: "District Of Columbia", value: "DC" },
        { text: "Federated States Of Micronesia", value: "FM" },
        { text: "Florida", value: "FL" },
        { text: "Georgia", value: "GA" },
        { text: "Guam", value: "GU" },
        { text: "Hawaii", value: "HI" },
        { text: "Idaho", value: "ID" },
        { text: "Illinois", value: "IL" },
        { text: "Indiana", value: "IN" },
        { text: "Iowa", value: "IA" },
        { text: "Kansas", value: "KS" },
        { text: "Kentucky", value: "KY" },
        { text: "Louisiana", value: "LA" },
        { text: "Maine", value: "ME" },
        { text: "Marshall Islands", value: "MH" },
        { text: "Maryland", value: "MD" },
        { text: "Massachusetts", value: "MA" },
        { text: "Michigan", value: "MI" },
        { text: "Minnesota", value: "MN" },
        { text: "Mississippi", value: "MS" },
        { text: "Missouri", value: "MO" },
        { text: "Montana", value: "MT" },
        { text: "Nebraska", value: "NE" },
        { text: "Nevada", value: "NV" },
        { text: "New Hampshire", value: "NH" },
        { text: "New Jersey", value: "NJ" },
        { text: "New Mexico", value: "NM" },
        { text: "New York", value: "NY" },
        { text: "North Carolina", value: "NC" },
        { text: "North Dakota", value: "ND" },
        { text: "Northern Mariana Islands", value: "MP" },
        { text: "Ohio", value: "OH" },
        { text: "Oklahoma", value: "OK" },
        { text: "Oregon", value: "OR" },
        { text: "Palau", value: "PW" },
        { text: "Pennsylvania", value: "PA" },
        { text: "Puerto Rico", value: "PR" },
        { text: "Rhode Island", value: "RI" },
        { text: "South Carolina", value: "SC" },
        { text: "South Dakota", value: "SD" },
        { text: "Tennessee", value: "TN" },
        { text: "Texas", value: "TX" },
        { text: "Utah", value: "UT" },
        { text: "Vermont", value: "VT" },
        { text: "Virgin Islands", value: "VI" },
        { text: "Virginia", value: "VA" },
        { text: "Washington", value: "WA" },
        { text: "West Virginia", value: "WV" },
        { text: "Wisconsin", value: "WI" },
        { text: "Wyoming", value: "WY" },
    ];

    const departments = [
        { text: "Sales", value: "Sales" },
        { text: "Marketing", value: "Marketing" },
        { text: "Engineering", value: "Engineering" },
        { text: "Human Resources", value: "Human Resources" },
        { text: "Legal", value: "Legal" },
    ];

    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState("");
    const handleFirstNamChange = (event: React.ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value);

    const [lastName, setLastName] = useState("");
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value);

    const [birthDate, setBirthDate] = useState<Date | undefined>();
    const [startDate, setStartDate] = useState<Date | undefined>();

    const [street, setStreet] = useState("");
    const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => setStreet(event.target.value);

    const [city, setCity] = useState("");
    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => setCity(event.target.value);

    const [zipCode, setZipCode] = useState("");
    const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => setZipCode(event.target.value);

    const [state, setState] = useState<SelectOption>(states[0]);
    const handleStateChange = (option: SelectOption) => setState(option);

    const [department, setDepartment] = useState<SelectOption>(departments[0]);
    const handleDepartmentChange = (option: SelectOption) => setDepartment(option);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const saveEmployee = () => {
        dispatch(
            addEmployee({
                birthDate: birthDate
                    ? new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(birthDate)
                    : undefined,
                city,
                department: department.value,
                firstName,
                lastName,
                startDate: startDate
                    ? new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(startDate)
                    : undefined,
                state: state.value,
                street,
                zipCode,
            })
        );

        setBirthDate(undefined);
        setCity("");
        setDepartment(departments[0]);
        setFirstName("");
        setLastName("");
        setStartDate(undefined);
        setState(states[0]);
        setStreet("");
        setZipCode("");

        setIsPopupOpen(true);
    };

    return (
        <>
            <div>
                <div className="title">
                    <h1>HRnet</h1>
                </div>
                <div className="container">
                    <Link to={"/employeelist"}>View current Employees</Link>
                    <h2>Create Employee</h2>
                    <form action="#" id="create-employee">
                        <Input label="First Name" type="text" value={firstName} onChange={handleFirstNamChange} />
                        <Input label="Last Name" type="text" value={lastName} onChange={handleLastNameChange} />

                        <label>Date of Birth</label>
                        <DatePicker
                            selected={birthDate}
                            onChange={(date) => setBirthDate(date ? date : undefined)}
                            showYearDropdown={true}
                            scrollableYearDropdown={true}
                            yearDropdownItemNumber={100}
                        />

                        <label>Start Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date ? date : undefined)}
                            showYearDropdown={true}
                            scrollableYearDropdown={true}
                        />

                        <fieldset className="address">
                            <legend>Address</legend>
                            <Input label="Street" type="text" value={street} onChange={handleStreetChange} />
                            <Input label="City" type="text" value={city} onChange={handleCityChange} />
                            <Select
                                label="State"
                                onChange={handleStateChange}
                                options={states}
                                value={state}
                                direction="top"
                            />
                            <Input label="Zip Code" type="number" value={zipCode} onChange={handleZipCodeChange} />
                        </fieldset>

                        <Select
                            label="Department"
                            onChange={handleDepartmentChange}
                            options={departments}
                            value={department}
                            direction="top"
                        />
                    </form>

                    <button onClick={saveEmployee}>Save</button>
                </div>
            </div>
            <Popup isOpen={isPopupOpen} message="Employee Created!" setIsOpen={setIsPopupOpen} />
        </>
    );
}

export default CreateEmployee;
