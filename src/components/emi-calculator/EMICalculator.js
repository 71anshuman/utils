import React, { useState, useEffect } from 'react';
import Breakup from './Breakup';
import AmountVsInterestChart from './AmountVsInterestChart';
import InterestVsLoanAmountChart from './InterestVsLoanAmountChart';
import { getInterestVsLoanAmountData, numberFormat } from '../../helpers/helpers';
import LoanJS from 'loanjs';

export default function EMICalculator({ theme }) {
    useEffect(() => {
        document.title = "EMI Calculator - DevUtils";
    }, []);

    // Set initial values as numbers
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [tenure, setTenure] = useState(15);
    const [rateOfInterest, setRateOfInterest] = useState(8.5);

    const [meta, setMeta] = useState({
        loanAmount: 0,
        interestAmount: 0,
        finalBalance: 0,
        emi: 0,
        installments: []
    });

    const [data, setData] = useState([]);

    // Live calculation loop
    useEffect(() => {
        const amt = Number(loanAmount);
        const yrs = Number(tenure);
        const rate = Number(rateOfInterest);

        if (isNaN(amt) || amt <= 0 || isNaN(yrs) || yrs <= 0 || isNaN(rate) || rate <= 0) {
            setMeta({ loanAmount: 0, interestAmount: 0, finalBalance: 0, emi: 0, installments: [] });
            setData([]);
            return;
        }

        try {
            const loan = new LoanJS.Loan(amt, yrs * 12, rate, false);
            const { installments, amount, sum, interestSum } = loan;

            setMeta({
                loanAmount: amount ?? 0,
                tenure: yrs,
                rateOfInterest: rate,
                finalBalance: Math.round(sum),
                interestAmount: Math.round(interestSum),
                emi: Math.round(installments[0].installment),
                installments: installments
            });
            setData(installments);
        } catch (e) {
            console.error(e);
        }
    }, [loanAmount, tenure, rateOfInterest]);

    return (
        <div className="container-fluid py-2">
            {/* Top glass panel */}
            <div className="glass-panel p-4 mb-4">
                <div className="row">
                    <div className="col-lg-7 d-flex flex-column justify-content-center">
                        <h1 className="display-6 font-weight-bold">EMI Calculator</h1>
                        <p className="lead text-secondary">
                            Calculate monthly loan payments (EMI), interest payable, and view complete amortization schedules interactively.
                        </p>
                        
                        {/* Live Outputs Grid */}
                        <div className="row mt-4">
                            <div className="col-sm-6 mb-3">
                                <div className="card p-3 h-100" style={{ borderLeft: '4px solid var(--primary)' }}>
                                    <div className="text-muted small text-uppercase font-weight-bold">Monthly EMI</div>
                                    <h3 className="h3 font-weight-bold mt-2 mb-0" style={{ color: 'var(--primary)' }}>
                                        {numberFormat(meta.emi)}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card p-3 h-100" style={{ borderLeft: '4px solid #a855f7' }}>
                                    <div className="text-muted small text-uppercase font-weight-bold">Total Interest</div>
                                    <h3 className="h3 font-weight-bold mt-2 mb-0" style={{ color: '#a855f7' }}>
                                        {numberFormat(meta.interestAmount)}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card p-3 h-100" style={{ borderLeft: '4px solid var(--text-muted)' }}>
                                    <div className="text-muted small text-uppercase font-weight-bold">Principal Loan</div>
                                    <h3 className="h4 font-weight-bold mt-2 mb-0">
                                        {numberFormat(meta.loanAmount)}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card p-3 h-100" style={{ borderLeft: '4px solid #10b981' }}>
                                    <div className="text-muted small text-uppercase font-weight-bold">Total Amount Payable</div>
                                    <h3 className="h4 font-weight-bold mt-2 mb-0" style={{ color: '#10b981' }}>
                                        {numberFormat(meta.finalBalance)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Controls Deck */}
                    <div className="col-lg-5 mt-4 mt-lg-0">
                        <div className="card p-4">
                            <h2 className="h5 font-weight-bold mb-4">Loan Parameters</h2>
                            
                            {/* Loan Amount Slider/Input */}
                            <div className="form-group mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="mb-0 font-weight-bold">Loan Amount</label>
                                    <div className="input-group input-group-sm" style={{ width: '170px' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&#8377;</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control text-right"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="50000000"
                                    step="10000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>₹10K</span>
                                    <span>₹5Cr</span>
                                </div>
                            </div>

                            {/* Interest Rate Slider/Input */}
                            <div className="form-group mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="mb-0 font-weight-bold">Interest Rate (p.a)</label>
                                    <div className="input-group input-group-sm" style={{ width: '110px' }}>
                                        <input
                                            type="number"
                                            step="0.05"
                                            className="form-control text-right"
                                            value={rateOfInterest}
                                            onChange={(e) => setRateOfInterest(Number(e.target.value))}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">%</span>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="25"
                                    step="0.1"
                                    value={rateOfInterest}
                                    onChange={(e) => setRateOfInterest(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>1%</span>
                                    <span>25%</span>
                                </div>
                            </div>

                            {/* Tenure Slider/Input */}
                            <div className="form-group mb-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="mb-0 font-weight-bold">Tenure (Years)</label>
                                    <div className="input-group input-group-sm" style={{ width: '120px' }}>
                                        <input
                                            type="number"
                                            className="form-control text-right"
                                            value={tenure}
                                            onChange={(e) => setTenure(Number(e.target.value))}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">Yrs</span>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    step="1"
                                    value={tenure}
                                    onChange={(e) => setTenure(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>1 Yr</span>
                                    <span>30 Yrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts & Breakdown Tables */}
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card p-3">
                        <h2 className="h6 font-weight-bold mb-3">Principal & Interest Balance Progression</h2>
                        <InterestVsLoanAmountChart data={getInterestVsLoanAmountData(meta.installments)} theme={theme} />
                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="card p-3 h-100">
                        <h2 className="h6 font-weight-bold mb-3">Payment Breakdown</h2>
                        <AmountVsInterestChart meta={meta} theme={theme} />
                    </div>
                </div>
                <div className="col-lg-8 mb-4">
                    <div className="card p-3 h-100">
                        <h2 className="h6 font-weight-bold mb-3">Installment Table Schedule</h2>
                        {data.length > 0 && <Breakup data={data} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
