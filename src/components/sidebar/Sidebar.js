import React from 'react'
import ButtonLink from './ButtonLink'
import './Sidebar.css'

export default function Sidebar({sidebar}) {
    const {setShowSidebar} = sidebar;

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setShowSidebar(false);
        }
    };

    return (
        <div className="col-md-2 col-sm-6 bg-dark left-sidebar">
            <div className="sidebar-section">
                <div className="sidebar-section-title">📊 Financial Tools</div>
                <ButtonLink onClick={handleLinkClick} url="/sip-calculator" text="SIP Calculator"/>
                <ButtonLink onClick={handleLinkClick} url="/emi-calculator" text="EMI Calculator"/>
                <ButtonLink onClick={handleLinkClick} url="/salary-hike-calculator" text="Salary Hike Calc"/>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-section-title">⚙️ Developer Tools</div>
                <ButtonLink onClick={handleLinkClick} url="/json-formatter" text="JSON Formatter"/>
                <ButtonLink onClick={handleLinkClick} url="/csv-to-json-converter" text="CSV to JSON"/>
                <ButtonLink onClick={handleLinkClick} url="/css-minifier" text="CSS Minifier"/>
                <ButtonLink onClick={handleLinkClick} url="/js-minifier" text="JS Minifier"/>
                <ButtonLink onClick={handleLinkClick} url="/regex-tester" text="Regex Tester"/>
                <ButtonLink onClick={handleLinkClick} url="/html-entity-encoder" text="HTML Entity Enc"/>
                <ButtonLink onClick={handleLinkClick} url="/hash-generator" text="Hash Generator"/>
                <ButtonLink onClick={handleLinkClick} url="/guid-generator" text="GUID/UUID Gen"/>
                <ButtonLink onClick={handleLinkClick} url="/base-64-converter" text="Base64 Converter"/>
                <ButtonLink onClick={handleLinkClick} url="/url-encoder" text="URL Encoder/Dec"/>
                <ButtonLink onClick={handleLinkClick} url="/password-generator" text="Password Gen"/>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-section-title">📝 Text & Content</div>
                <ButtonLink onClick={handleLinkClick} url="/word-counter" text="Word Counter"/>
                <ButtonLink onClick={handleLinkClick} url="/multi-line-to-single-line" text="Multi to Single Line"/>
                <ButtonLink onClick={handleLinkClick} url="/text-case-converter" text="Text Case Conv"/>
                <ButtonLink onClick={handleLinkClick} url="/markdown-converter" text="Markdown Converter"/>
                <ButtonLink onClick={handleLinkClick} url="/lorem-generator" text="Lorem Ipsum Gen"/>
                <ButtonLink onClick={handleLinkClick} url="/ascii-art-generator" text="ASCII Art Gen"/>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-section-title">🎨 Utilities & Design</div>
                <ButtonLink onClick={handleLinkClick} url="/color-picker" text="Color Picker"/>
                <ButtonLink onClick={handleLinkClick} url="/qr-code-generator" text="QR Code Gen"/>
                <ButtonLink onClick={handleLinkClick} url="/image-compressor" text="Image Compressor"/>
                <ButtonLink onClick={handleLinkClick} url="/timestamp-converter" text="Timestamp Conv"/>
                <ButtonLink onClick={handleLinkClick} url="/ip-lookup" text="IP Lookup"/>
                <ButtonLink onClick={handleLinkClick} url="/unit-converter" text="Unit Converter"/>
            </div>
        </div>
    )
}
