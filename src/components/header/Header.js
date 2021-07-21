import React from 'react'
import {Link} from 'react-router-dom'
// import Navlink from '../common/Navlink'
import Menu from './Menu'

export default function Header({sidebar}) {
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
            <Menu sidebar={sidebar} />
            <div className="container">
                <Link className="navbar-brand" to="/">Tools</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* <Navlink url="/sip-calculator" text="SIP Calc"/>
                        <Navlink url="/multi-line-to-single-line" text="Multi To Single Line"/>
                        <Navlink url="/salary-hike-calculator" text="Salary Hike Calc" />
                        <Navlink url="/password-generator" text="Password Gen" />
                        <Navlink url="/word-counter" text="Word Counter" />
                        <Navlink url="/json-formatter" text="JSON Formatter" />
                        <Navlink url="/base-64-converter" text="Base64 Conv" />
                        <Navlink url="/emi-calculator" text="EMI Calc" /> */}
                    </ul>
                    <ul className="navbar-nav ml-auto" >
                        <li className="nav-item dropdown">
                            <a className="nav-link" target="_new" href="https://github.com/71anshuman">Dev</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
