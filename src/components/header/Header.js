import React from 'react'
import {Link} from 'react-router-dom'
import Menu from './Menu'

export default function Header({sidebar, theme, toggleTheme}) {
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <Menu sidebar={sidebar} />
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span style={{ marginRight: '8px' }}>⚡</span>
                    <span className="gradient-text font-weight-bold">DevUtils</span>
                </Link>
                
                <div className="d-flex align-items-center">
                    <button 
                        onClick={toggleTheme} 
                        className="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center" 
                        style={{
                            borderRadius: '50%', 
                            width: '40px', 
                            height: '40px', 
                            padding: 0, 
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            boxShadow: 'var(--box-shadow-sm)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            /* Sun Icon */
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbf24', transform: 'rotate(0deg)', transition: 'transform 0.5s ease' }}>
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        ) : (
                            /* Moon Icon */
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6366f1', transform: 'rotate(-15deg)', transition: 'transform 0.5s ease' }}>
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        )}
                    </button>
                    <a 
                        className="btn btn-secondary btn-sm ml-3 d-none d-sm-inline-block" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        href="https://github.com/71anshuman"
                        style={{
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-main)',
                            fontSize: '0.85rem'
                        }}
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </nav>
    )
}
