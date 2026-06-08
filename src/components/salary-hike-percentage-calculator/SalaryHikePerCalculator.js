import React, { useState, useEffect } from 'react';
import { numberFormat } from '../../helpers/helpers';

export default function SalaryHikePerCalculator() {
    useEffect(() => {
        document.title = "Salary Hike Calculator - DevUtils";
    }, []);

    const [activeTab, setActiveTab] = useState('hikeAmount'); // 'hikeAmount' or 'hikePercentage'

    // Tab 1 state
    const [currentSalary, setCurrentSalary] = useState(500000);
    const [hikePercentage, setHikePercentage] = useState(15);
    const [calculatedNewSalary, setCalculatedNewSalary] = useState(575000);
    const [calculatedHikeAmount, setCalculatedHikeAmount] = useState(75000);

    // Tab 2 state
    const [tab2CurrentSalary, setTab2CurrentSalary] = useState(500000);
    const [tab2NewSalary, setTab2NewSalary] = useState(600000);
    const [calculatedHikePercent, setCalculatedHikePercent] = useState(20);
    const [tab2HikeAmount, setTab2HikeAmount] = useState(100000);

    // Live calculation for Tab 1
    useEffect(() => {
        const salary = Number(currentSalary);
        const percent = Number(hikePercentage);

        if (isNaN(salary) || salary < 0 || isNaN(percent) || percent < 0) {
            setCalculatedNewSalary(0);
            setCalculatedHikeAmount(0);
            return;
        }

        const increment = (salary * percent) / 100;
        setCalculatedHikeAmount(Math.round(increment));
        setCalculatedNewSalary(Math.round(salary + increment));
    }, [currentSalary, hikePercentage]);

    // Live calculation for Tab 2
    useEffect(() => {
        const cur = Number(tab2CurrentSalary);
        const next = Number(tab2NewSalary);

        if (isNaN(cur) || cur <= 0 || isNaN(next) || next < 0) {
            setCalculatedHikePercent(0);
            setTab2HikeAmount(0);
            return;
        }

        const diff = next - cur;
        const percent = (diff / cur) * 100;
        setTab2HikeAmount(Math.round(diff));
        setCalculatedHikePercent(Number(percent.toFixed(2)));
    }, [tab2CurrentSalary, tab2NewSalary]);

    return (
        <div className="container-fluid py-2">
            {/* Header Jumbotron */}
            <div className="glass-panel p-4 mb-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <div>
                        <h1 className="display-6 font-weight-bold mb-2">Salary Hike Calculator</h1>
                        <p className="lead text-secondary mb-0">
                            Calculate your salary increment percentage or project your new salary instantly using interactive controls.
                        </p>
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="mt-3 mt-md-0 btn-group p-1" style={{ background: 'var(--primary-light)', borderRadius: '14px' }}>
                        <button
                            className={`btn btn-sm px-3 ${activeTab === 'hikeAmount' ? 'btn-primary' : 'btn-link text-decoration-none'}`}
                            onClick={() => setActiveTab('hikeAmount')}
                            style={{ 
                                borderRadius: '10px !important', 
                                border: 'none',
                                color: activeTab === 'hikeAmount' ? '#fff' : 'var(--primary-on-light)',
                                fontWeight: '600'
                            }}
                        >
                            New Salary
                        </button>
                        <button
                            className={`btn btn-sm px-3 ${activeTab === 'hikePercentage' ? 'btn-primary' : 'btn-link text-decoration-none'}`}
                            onClick={() => setActiveTab('hikePercentage')}
                            style={{ 
                                borderRadius: '10px !important', 
                                border: 'none',
                                color: activeTab === 'hikePercentage' ? '#fff' : 'var(--primary-on-light)',
                                fontWeight: '600'
                            }}
                        >
                            Hike Percentage
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="row">
                {activeTab === 'hikeAmount' ? (
                    /* Tab 1: Calculate New Salary */
                    <>
                        {/* Control panel */}
                        <div className="col-lg-6 mb-4">
                            <div className="card p-4 h-100">
                                <h3 className="h5 font-weight-bold mb-4">Salary Parameters</h3>
                                
                                {/* Current Salary */}
                                <div className="form-group mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="mb-0 font-weight-bold">Current Salary (Annual/Monthly)</label>
                                        <div className="input-group input-group-sm" style={{ width: '160px' }}>
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">&#8377;</span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control text-right"
                                                value={currentSalary}
                                                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="5000000"
                                        step="10000"
                                        value={currentSalary}
                                        onChange={(e) => setCurrentSalary(Number(e.target.value))}
                                    />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>₹10K</span>
                                        <span>₹50L</span>
                                    </div>
                                </div>

                                {/* Hike Percentage */}
                                <div className="form-group mb-2">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="mb-0 font-weight-bold">Hike Percentage</label>
                                        <div className="input-group input-group-sm" style={{ width: '110px' }}>
                                            <input
                                                type="number"
                                                step="0.5"
                                                className="form-control text-right"
                                                value={hikePercentage}
                                                onChange={(e) => setHikePercentage(Number(e.target.value))}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="150"
                                        step="0.5"
                                        value={hikePercentage}
                                        onChange={(e) => setHikePercentage(Number(e.target.value))}
                                    />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>0%</span>
                                        <span>150%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Output visual dashboard */}
                        <div className="col-lg-6 mb-4">
                            <div className="card p-4 h-100 d-flex flex-column justify-content-between">
                                <h3 className="h5 font-weight-bold mb-4">Increment Projections</h3>
                                
                                <div className="d-flex flex-column" style={{ gap: '24px' }}>
                                    <div className="p-3 border rounded" style={{ borderLeft: '4px solid #a855f7 !important', background: 'var(--bg-card)' }}>
                                        <div className="text-muted small text-uppercase font-weight-bold">Hike Amount</div>
                                        <h2 className="h3 font-weight-bold mt-2 mb-0" style={{ color: '#a855f7' }}>
                                            {numberFormat(calculatedHikeAmount)}
                                        </h2>
                                    </div>
                                    
                                    <div className="p-4 border rounded" style={{ 
                                        borderLeft: '4px solid var(--primary) !important', 
                                        background: 'var(--primary-light) !important',
                                        borderColor: 'var(--primary) !important'
                                    }}>
                                        <div className="text-muted small text-uppercase font-weight-bold" style={{ color: 'var(--primary-on-light)' }}>Projected New Salary</div>
                                        <h2 className="display-6 font-weight-bold mt-2 mb-0" style={{ color: 'var(--primary-on-light)' }}>
                                            {numberFormat(calculatedNewSalary)}
                                        </h2>
                                    </div>
                                </div>
                                <div className="mt-4 text-muted small text-center">
                                    Dragging sliders dynamically recalibrates the increment outputs.
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Tab 2: Calculate Hike Percentage */
                    <>
                        {/* Control panel */}
                        <div className="col-lg-6 mb-4">
                            <div className="card p-4 h-100">
                                <h3 className="h5 font-weight-bold mb-4">Salary Details</h3>
                                
                                {/* Current Salary */}
                                <div className="form-group mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="mb-0 font-weight-bold">Current Salary</label>
                                        <div className="input-group input-group-sm" style={{ width: '160px' }}>
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">&#8377;</span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control text-right"
                                                value={tab2CurrentSalary}
                                                onChange={(e) => setTab2CurrentSalary(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="5000000"
                                        step="10000"
                                        value={tab2CurrentSalary}
                                        onChange={(e) => setTab2CurrentSalary(Number(e.target.value))}
                                    />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>₹10K</span>
                                        <span>₹50L</span>
                                    </div>
                                </div>

                                {/* New Salary */}
                                <div className="form-group mb-2">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <label className="mb-0 font-weight-bold">New Salary</label>
                                        <div className="input-group input-group-sm" style={{ width: '160px' }}>
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">&#8377;</span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control text-right"
                                                value={tab2NewSalary}
                                                onChange={(e) => setTab2NewSalary(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="10000000"
                                        step="10000"
                                        value={tab2NewSalary}
                                        onChange={(e) => setTab2NewSalary(Number(e.target.value))}
                                    />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>₹10K</span>
                                        <span>₹1Cr</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Output visual dashboard */}
                        <div className="col-lg-6 mb-4">
                            <div className="card p-4 h-100 d-flex flex-column justify-content-between">
                                <h3 className="h5 font-weight-bold mb-4">Hike Evaluation</h3>
                                
                                <div className="d-flex flex-column" style={{ gap: '24px' }}>
                                    <div className="p-3 border rounded" style={{ borderLeft: '4px solid #a855f7 !important', background: 'var(--bg-card)' }}>
                                        <div className="text-muted small text-uppercase font-weight-bold">Absolute Increment</div>
                                        <h2 className="h3 font-weight-bold mt-2 mb-0" style={{ color: '#a855f7' }}>
                                            {tab2HikeAmount >= 0 ? numberFormat(tab2HikeAmount) : `-${numberFormat(Math.abs(tab2HikeAmount))}`}
                                        </h2>
                                    </div>
                                    
                                    <div className="p-4 border rounded" style={{ 
                                        borderLeft: '4px solid var(--primary) !important', 
                                        background: 'var(--primary-light) !important',
                                        borderColor: 'var(--primary) !important'
                                    }}>
                                        <div className="text-muted small text-uppercase font-weight-bold" style={{ color: 'var(--primary-on-light)' }}>Hike Percentage</div>
                                        <h2 className="display-6 font-weight-bold mt-2 mb-0" style={{ color: 'var(--primary-on-light)' }}>
                                            {calculatedHikePercent}%
                                        </h2>
                                    </div>
                                </div>
                                <div className="mt-4 text-muted small text-center">
                                    Calculates the percentage increase dynamically in real-time.
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
