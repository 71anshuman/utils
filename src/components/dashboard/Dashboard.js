import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../../constants';

export default function Dashboard({ favorites, toggleFavorite }) {
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    useEffect(() => {
        document.title = "DevUtils - Dashboard";
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Filter tools
    const filteredTools = TOOLS.filter(tool => {
        const query = searchQuery.toLowerCase();
        return (
            tool.name.toLowerCase().includes(query) ||
            tool.desc.toLowerCase().includes(query) ||
            tool.category.toLowerCase().includes(query)
        );
    });

    // Group filtered tools by category
    const categories = ['Financial', 'Developer', 'Text', 'Utilities'];

    const toolsByCategory = categories.reduce((acc, cat) => {
        acc[cat] = filteredTools.filter(t => t.category === cat);
        return acc;
    }, {});

    const favoriteTools = TOOLS.filter(t => favorites.includes(t.id));

    return (
        <div className="container-fluid py-2">
            {/* Hero Section */}
            <div className="jumbotron p-5 mb-5 text-center position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
                <div style={{ zIndex: 2, position: 'relative' }}>
                    <h1 className="display-4 font-weight-bold mb-3">
                        Welcome to <span className="gradient-text">DevUtils</span>
                    </h1>
                    <p className="lead text-secondary max-w-2xl mx-auto" style={{ fontSize: '1.15rem' }}>
                        All your essential developer utilities, financial calculators, text helpers, and design tools inside one sleek, fast workspace.
                    </p>
                </div>
                {/* Background ambient glowing circles */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    left: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(99, 102, 241, 0.12)',
                    filter: 'blur(50px)',
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(168, 85, 247, 0.12)',
                    filter: 'blur(50px)',
                    borderRadius: '50%'
                }}></div>
            </div>

            {/* Search Bar */}
            <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                    <div className="input-group input-group-lg" style={{ boxShadow: 'var(--box-shadow-sm)', borderRadius: '12px' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ background: 'var(--bg-card)', borderRight: 'none', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ color: 'var(--primary)' }}>
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>
                        </div>
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search for tools (e.g. JSON, SIP, base64...)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                borderLeft: 'none',
                                borderTopRightRadius: '12px',
                                borderBottomRightRadius: '12px',
                                height: '54px'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Starred / Favorites Tools Section */}
            {favoriteTools.length > 0 && searchQuery === '' && (
                <div className="mb-5">
                    <h2 className="h4 font-weight-bold mb-4 d-flex align-items-center">
                        <span style={{ color: '#f59e0b', marginRight: '8px' }}>⭐️</span> Starred Favorites
                    </h2>
                    <div className="row">
                        {favoriteTools.map(tool => (
                            <div key={tool.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <div className="position-relative">
                                    <Link to={tool.path} className="glass-card h-100">
                                        <div className="d-flex align-items-start justify-content-between mb-3">
                                            <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
                                        </div>
                                        <h3 className="h6 font-weight-bold mb-2">{tool.name}</h3>
                                        <p className="text-secondary small mb-0">{tool.desc}</p>
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleFavorite(tool.id);
                                        }}
                                        className="btn p-0 position-absolute"
                                        style={{ top: '15px', right: '15px', zIndex: 10 }}
                                        aria-label="Unstar tool"
                                    >
                                        <span className="favorite-star active font-weight-bold">★</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="my-5" style={{ borderColor: 'var(--border-color)' }} />
                </div>
            )}

            {/* Empty Search State */}
            {filteredTools.length === 0 && (
                <div className="text-center py-5">
                    <span style={{ fontSize: '3rem' }}>🔍</span>
                    <h3 className="h5 font-weight-bold mt-3">No tools match "{searchQuery}"</h3>
                    <p className="text-secondary">Try searching for different keywords or categories.</p>
                </div>
            )}

            {/* Categorized Tools Grid */}
            {categories.map(cat => {
                const catTools = toolsByCategory[cat];
                if (catTools.length === 0) return null;

                // Category Icons
                const catIcon = cat === 'Financial' ? '📊' : cat === 'Developer' ? '⚙️' : cat === 'Text' ? '📝' : '🎨';

                return (
                    <div key={cat} className="mb-5">
                        <h2 className="h4 font-weight-bold mb-4 d-flex align-items-center">
                            <span style={{ marginRight: '8px' }}>{catIcon}</span> {cat} Tools
                        </h2>
                        <div className="row">
                            {catTools.map(tool => {
                                const isFav = favorites.includes(tool.id);
                                return (
                                    <div key={tool.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                        <div className="position-relative h-100">
                                            <Link to={tool.path} className="glass-card h-100 d-flex flex-column">
                                                <div className="d-flex align-items-start justify-content-between mb-3">
                                                    <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
                                                </div>
                                                <h3 className="h6 font-weight-bold mb-2">{tool.name}</h3>
                                                <p className="text-secondary small mb-0 flex-grow-1">{tool.desc}</p>
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleFavorite(tool.id);
                                                }}
                                                className="btn p-0 position-absolute"
                                                style={{ top: '15px', right: '15px', zIndex: 10 }}
                                                aria-label={isFav ? "Unstar tool" : "Star tool"}
                                            >
                                                <span className={`favorite-star ${isFav ? 'active' : ''} font-weight-bold`}>
                                                    {isFav ? '★' : '☆'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
