import React, { useState, useEffect } from 'react';
import { Finance } from 'financejs';
import Breakup from './Breakup';
import InvestedVsGainChart from './InvestedVsGainChart';
import { numberFormat } from '../../helpers/helpers';

const finance = new Finance();

export default function SipCalculator({ theme }) {
    useEffect(() => {
        document.title = "SIP Calculator - DevUtils";
    }, []);

    // Set default initial state values as numbers
    const [sipAmount, setSipAmount] = useState(5000);
    const [period, setPeriod] = useState(10);
    const [rateOfReturn, setRateOfReturn] = useState(12);

    const [meta, setMeta] = useState({ investmentAmount: 0, interestAmount: 0, finalBalance: 0 });
    const [data, setData] = useState([]);

    // Live calculation loop
    useEffect(() => {
        const amt = Number(sipAmount);
        const yrs = Number(period);
        const rate = Number(rateOfReturn);

        if (isNaN(amt) || amt <= 0 || isNaN(yrs) || yrs <= 0 || isNaN(rate) || rate <= 0) {
            setMeta({ investmentAmount: 0, interestAmount: 0, finalBalance: 0 });
            setData([]);
            return;
        }

        let investmentAmount = 0;
        let interest = 0;
        let balanceAtEndOfMonth = 0;
        const transactions = [];
        let year = 1;
        let month;

        for (let i = 1; i <= yrs * 12; i++) {
            const mon = parseInt(i % 12);
            month = mon === 0 ? 12 : mon;
            const totalAmountThisMonth = investmentAmount + amt;
            balanceAtEndOfMonth = totalAmountThisMonth * (1 + (rate / 100) / 12);
            const thisMonthInterest = Math.round(finance.CI(rate / 12, 1, totalAmountThisMonth, 1) - totalAmountThisMonth);
            interest += thisMonthInterest;

            transactions.push({
                year: year,
                month: month,
                initialBalance: Math.round(investmentAmount),
                investment: amt,
                interest: thisMonthInterest,
                balanceAtEndOfMonth: Math.round(balanceAtEndOfMonth),
                totalInterest: interest
            });

            investmentAmount = balanceAtEndOfMonth;
            if (mon === 0) {
                year++;
            }
        }

        setData(transactions);
        const invested = yrs * 12 * amt;
        setMeta({
            investmentAmount: invested,
            period: yrs,
            rateOfReturn: rate,
            finalBalance: Math.round(investmentAmount),
            interestAmount: Math.round(investmentAmount - invested),
        });
    }, [sipAmount, period, rateOfReturn]);

    return (
        <div className="container-fluid py-2">
            {/* Top glass panel */}
            <div className="glass-panel p-4 mb-4">
                <div className="row">
                    <div className="col-lg-7 d-flex flex-column justify-content-center">
                        <h1 className="display-6 font-weight-bold">SIP Calculator</h1>
                        <p className="lead text-secondary">
                            A Systematic Investment Plan (SIP) helps you accumulate long term wealth by investing small amounts regularly.
                        </p>
                        
                        {/* Live Outputs Grid */}
                        <div className="row mt-4">
                            <div className="col-sm-4 mb-3">
                                <div className="card p-3 h-100" style={{ borderLeft: '4px solid var(--primary-on-light)' }}>
                                    <div className="text-muted small text-uppercase font-weight-bold">Total Invested</div>
                                    <h3 className="h4 font-weight-bold mt-2 mb-0" style={{ color: 'var(--text-main)' }}>
                                        {numberFormat(meta.investmentAmount)}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-4 mb-3">
                                <div className="card p-3 h-100" style={{ borderLeft: '4px solid #a855f7' }}>
                                    <div className="text-muted small text-uppercase font-weight-bold">Est. Returns</div>
                                    <h3 className="h4 font-weight-bold mt-2 mb-0" style={{ color: '#a855f7' }}>
                                        {numberFormat(meta.interestAmount)}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-4 mb-3">
                                <div className="card p-3 h-100" style={{ 
                                    background: 'var(--primary-light) !important', 
                                    border: '1px solid var(--primary) !important',
                                    borderLeft: '4px solid var(--primary) !important'
                                }}>
                                    <div className="text-muted small text-uppercase font-weight-bold" style={{ color: 'var(--primary-on-light)' }}>Total Value</div>
                                    <h3 className="h4 font-weight-bold mt-2 mb-0" style={{ color: 'var(--primary-on-light)' }}>
                                        {numberFormat(meta.finalBalance)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Controls Deck */}
                    <div className="col-lg-5 mt-4 mt-lg-0">
                        <div className="card p-4">
                            <h2 className="h5 font-weight-bold mb-4">Adjust Parameters</h2>
                            
                            {/* Monthly Investment Slider/Input */}
                            <div className="form-group mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="mb-0 font-weight-bold">Monthly Investment</label>
                                    <div className="input-group input-group-sm" style={{ width: '150px' }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&#8377;</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control text-right"
                                            value={sipAmount}
                                            onChange={(e) => setSipAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="1000000"
                                    step="500"
                                    value={sipAmount}
                                    onChange={(e) => setSipAmount(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>₹500</span>
                                    <span>₹10L</span>
                                </div>
                            </div>

                            {/* Investment Period Slider/Input */}
                            <div className="form-group mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="mb-0 font-weight-bold">Expected Return (p.a)</label>
                                    <div className="input-group input-group-sm" style={{ width: '110px' }}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            className="form-control text-right"
                                            value={rateOfReturn}
                                            onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">%</span>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    step="0.5"
                                    value={rateOfReturn}
                                    onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>1%</span>
                                    <span>30%</span>
                                </div>
                            </div>

                            {/* Tenure Slider/Input */}
                            <div className="form-group mb-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="mb-0 font-weight-bold">Time Period</label>
                                    <div className="input-group input-group-sm" style={{ width: '120px' }}>
                                        <input
                                            type="number"
                                            className="form-control text-right"
                                            value={period}
                                            onChange={(e) => setPeriod(Number(e.target.value))}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">Yrs</span>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="40"
                                    step="1"
                                    value={period}
                                    onChange={(e) => setPeriod(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>1 Yr</span>
                                    <span>40 Yrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Charts and Tables */}
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card p-3 h-100">
                        <h2 className="h6 font-weight-bold mb-3">Investment Breakdown</h2>
                        <InvestedVsGainChart meta={meta} theme={theme} />
                    </div>
                </div>
                <div className="col-lg-8 mb-4">
                    <div className="card p-3 h-100">
                        <h2 className="h6 font-weight-bold mb-3">Yearly Amortization Schedule</h2>
                        {data.length > 0 && <Breakup data={data} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
