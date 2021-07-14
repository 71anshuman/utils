import React from 'react'
import {Link} from 'react-router-dom'
import Navlink from '../components/common/Navlink'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Tools</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <Navlink url="/sip-calculator" text="SIP Calculator"/>
                        <Navlink url="/multi-line-to-single-line" text="Multi Line To Single Line"/>
                        <Navlink url="/salary-hike-calculator" text="Salary Hike Calculator" />
                        <Navlink url="/password-generator" text="Password Generator" />
                        <Navlink url="/word-counter" text="Word Counter" />
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
