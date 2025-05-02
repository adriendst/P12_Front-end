import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Employee = {
    firstName?: string;
    lastName?: string;
    startDate?: string;
    department?: string;
    birthDate?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
};

// Define a type for the slice state
interface EmployeeState {
    employees: Employee[];
}

// Define the initial state using that type
const initialState: EmployeeState = {
    employees: [],
};

export const employeesSlice = createSlice({
    name: "employees",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
        },
    },
});

export const { addEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
