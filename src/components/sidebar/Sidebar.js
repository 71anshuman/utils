import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TOOLS } from '../../constants';
import './Sidebar.css';

export default function Sidebar({ sidebar, favorites, toggleFavorite }) {
    const { setShowSidebar } = sidebar;
    const [searchQuery, setSearchQuery] = useState('');
    const [collapsed, setCollapsed] = useState({
        Favorites: false,
        Financial: false,
        Developer: false,
        Text: false,
        Utilities: false
    });

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setShowSidebar(false);
        }
    };

    const toggleCollapse = (category) => {
        setCollapsed(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Filter tools based on search query
    const filteredTools = TOOLS.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = ['Financial', 'Developer', 'Text', 'Utilities'];

    const favoriteTools = TOOLS.filter(t => favorites.includes(t.id) && t.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="col-md-2 col-sm-6 left-sidebar d-flex flex-column">
            {/* Sidebar Search */}
            <div className="px-3 mb-4">
                <div className="input-group input-group-sm">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            fontSize: '0.85rem',
                            padding: '8px 12px !important',
                            height: '36px'
                        }}
                    />
                    {searchQuery && (
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setSearchQuery('')}
                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Scrollable Links Area */}
            <div className="flex-grow-1 overflow-auto px-1">
                
                {/* Favorites Category */}
                {favoriteTools.length > 0 && (
                    <div className="sidebar-section mb-3">
                        <div className="sidebar-category-header" onClick={() => toggleCollapse('Favorites')}>
                            <span>⭐ Favorites</span>
                            <span style={{ fontSize: '0.7rem' }}>{collapsed.Favorites ? '▼' : '▲'}</span>
                        </div>
                        <div className={`sidebar-category-content ${collapsed.Favorites ? 'collapsed' : ''}`} style={{ maxHeight: '1000px' }}>
                            {favoriteTools.map(tool => (
                                <div key={tool.id} className="d-flex align-items-center justify-content-between position-relative">
                                    <NavLink 
                                        to={tool.path} 
                                        onClick={handleLinkClick} 
                                        activeClassName="active" 
                                        className="navlink w-100 pr-5"
                                    >
                                        <span>{tool.icon} <span className="ml-2">{tool.name}</span></span>
                                    </NavLink>
                                    <span 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleFavorite(tool.id);
                                        }}
                                        className="favorite-star active position-absolute"
                                        style={{ right: '12px', zIndex: 10, userSelect: 'none' }}
                                    >
                                        ★
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Standard Categories */}
                {categories.map(cat => {
                    const catTools = filteredTools.filter(t => t.category === cat);
                    if (catTools.length === 0) return null;

                    const isCollapsed = collapsed[cat];
                    const catIcon = cat === 'Financial' ? '📊' : cat === 'Developer' ? '⚙️' : cat === 'Text' ? '📝' : '🎨';

                    return (
                        <div key={cat} className="sidebar-section mb-3">
                            <div className="sidebar-category-header" onClick={() => toggleCollapse(cat)}>
                                <span>{catIcon} {cat}</span>
                                <span style={{ fontSize: '0.7rem' }}>{isCollapsed ? '▼' : '▲'}</span>
                            </div>
                            <div className={`sidebar-category-content ${isCollapsed ? 'collapsed' : ''}`} style={{ maxHeight: '1000px' }}>
                                {catTools.map(tool => {
                                    const isFav = favorites.includes(tool.id);
                                    return (
                                        <div key={tool.id} className="d-flex align-items-center justify-content-between position-relative">
                                            <NavLink 
                                                to={tool.path} 
                                                onClick={handleLinkClick} 
                                                activeClassName="active" 
                                                className="navlink w-100 pr-5"
                                            >
                                                <span>{tool.icon} <span className="ml-2">{tool.name}</span></span>
                                            </NavLink>
                                            <span 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleFavorite(tool.id);
                                                }}
                                                className={`favorite-star ${isFav ? 'active' : ''} position-absolute`}
                                                style={{ right: '12px', zIndex: 10, userSelect: 'none' }}
                                            >
                                                {isFav ? '★' : '☆'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {filteredTools.length === 0 && favoriteTools.length === 0 && (
                    <div className="text-center py-4 text-muted small">
                        No matches found
                    </div>
                )}
            </div>
        </div>
    );
}
