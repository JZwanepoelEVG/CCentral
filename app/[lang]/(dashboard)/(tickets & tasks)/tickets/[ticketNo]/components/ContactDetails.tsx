"use client"
import { Fragment } from "react"

const ContactDetails = () => {
    return (
        <Fragment>
        <ul className="md:grid grid-cols-1 space-y-2 md:space-y-1">
            <li>
                <span className="text-sm text-default-700 font-medium">Full Name: </span>
                <span className="text-default-500 ">Helene Liebenberg</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Company: </span>
                <span className="text-default-500 ">Alviva Shared Management Services</span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Email: </span>
                <span className="text-blue-600"><a href={"mailto:test@test.com"}> HLiebenberg@tarsus.co.za</a></span>
            </li>
            <li>
                <span className="text-sm text-default-700 font-medium">Contact Number: </span>
                <span className="text-blue-600 "><a href={"tel:+27115311000"}>+27115311000</a></span>
            </li>
        </ul>
    </Fragment>
)};

export default ContactDetails;