"use client"
import { Fragment } from "react"

const Costing = () => {
    return (
        <Fragment>
            <ul className="md:grid grid-cols-1 space-y-2 md:space-y-1">
                <li>
                    <span className="text-sm text-default-700 font-medium">Billing Type: </span>
                    <span className="text-default-500 ">Retainer (3)</span>
                </li>
                <li>
                    <span className="text-sm text-default-700 font-medium">Rand Value: </span>
                    <span className="text-default-500">0.00</span>
                </li>
                <li>
                    <span className="text-sm text-default-700 font-medium">Budgeted Hours: </span>
                    <span className="text-default-500">10.00</span>
                </li>
                <li>
                    <span className="text-sm text-default-700 font-medium">Retainer Status: </span>
                    <span className="text-default-500"><br/>
                        Current Balance: 67.75 <br/>
                        Approved In Progress: 56.00<br/>
                        Pending Approval: 4.00<br/>
                        Retainer allocation: 0.00<br/>
                        Available: 7.75<br/>
                    </span>
                </li>
            </ul>
        </Fragment>
    )};

export default Costing;