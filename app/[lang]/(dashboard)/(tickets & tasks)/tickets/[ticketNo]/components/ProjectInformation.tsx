"use client"
import { Fragment } from "react"

const ProjectInformation = () => {
    return (
        <Fragment>
        <ul className="md:grid grid-cols-1 space-y-2 md:space-y-1">
            <li>
                <span className="text-sm text-default-700 font-medium">Query Subject: </span>
                <span className="text-default-500 ">Provisioning Agent Setup</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Is This a Follow Up?: </span>
                <span className="text-default-500">No (2)</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Client Projects: </span>
                <span className="text-default-500">Pragma Group - AD Integration (6042)</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Billing Type: </span>
                <span className="text-default-500">Retainer (3)</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Project Document: </span>
                <span className="text-default-500">No (2)</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Resolution Hours Allocated: </span>
                <span className="text-default-500">10.00</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Due Date: </span>
                <span className="text-default-500">28 Feb 2025</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Activity: </span>
                <span className="text-default-500">Configuration (33)</span>
            </li>
        </ul>
    </Fragment>
)};

export default ProjectInformation;