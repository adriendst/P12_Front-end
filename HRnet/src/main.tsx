import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CreateEmployee from "./createEmployee/createEmployee";
import EmployeeList from "./employeeList/employeeList";
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/createemployee",
                element: <CreateEmployee />,
            },
            {
                path: "/employeelist",
                element: <EmployeeList />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
