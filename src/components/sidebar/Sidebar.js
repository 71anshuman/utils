import React from 'react'
import ButtonLink from './ButtonLink'
import './Sidebar.css'

export default function Sidebar() {
    // const {showSidebar, setShowSidebar} = sidebar;
    return (
        <div className="col-2 bg-dark left-sidebar">
            <ButtonLink url="/sip-calculator" text="SIP Calc"/>
            <ButtonLink url="/multi-line-to-single-line" text="Multi To Single Line"/>
            <ButtonLink url="/salary-hike-calculator" text="Salary Hike Calc" />
            <ButtonLink url="/password-generator" text="Password Gen" />
            <ButtonLink url="/word-counter" text="Word Counter" />
            <ButtonLink url="/json-formatter" text="JSON Formatter" />
            <ButtonLink url="/base-64-converter" text="Base64 Conv" />
            <ButtonLink url="/emi-calculator" text="EMI Calc" />
        </div>
    )
}
