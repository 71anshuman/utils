import React from 'react'
import ButtonLink from './ButtonLink'
import './Sidebar.css'

export default function Sidebar({sidebar}) {
    const {showSidebar, setShowSidebar} = sidebar;
    return (
        <div className="col-md-2 col-sm-6 bg-dark left-sidebar">
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/sip-calculator" text="SIP Calc"/>
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/multi-line-to-single-line" text="Multi To Single Line"/>
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/salary-hike-calculator" text="Salary Hike Calc" />
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/password-generator" text="Password Gen" />
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/word-counter" text="Word Counter" />
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/json-formatter" text="JSON Formatter" />
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/base-64-converter" text="Base64 Conv" />
            <ButtonLink onClick={() => setShowSidebar(!showSidebar)} url="/emi-calculator" text="EMI Calc" />
        </div>
    )
}
