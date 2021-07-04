import React from 'react'
import {Link} from 'react-router-dom'

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
                        <Link to="/sip-calculator" className="nav-link">SIP Calculator</Link>
                        <li className="nav-item">
                            <a className="nav-link" href="http://71anshuman.com">Dev</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
