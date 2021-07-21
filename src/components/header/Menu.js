import React from "react";
// import SvgGraphics from "../../svgGraphics";

export default function Menu({sidebar}) {
    const {showSidebar, setShowSidebar} = sidebar;

    return (
        <button className="btn btn-outline" onClick={() => setShowSidebar(!showSidebar)}>
            {/* <SvgGraphics iconType="menu" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
        </button>
    )
}
