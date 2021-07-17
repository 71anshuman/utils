import React, {useState, useEffect} from 'react'

import Breakup from './Breakup';
import AmountVsInterestChart from './AmountVsInterestChart';
import DataOverview from './DataOverview';
import { useFinInput } from '../../hooks/useFinInput';
import Input from '../common/Input';
import LoanJS from 'loanjs'

export default function EMICalculator() {
    useEffect(() => {
        document.title = "EMI Calculator"
    }, []);

    const [{loanAmount, tenure, rateOfInterest}, handleChange] = useFinInput(
        {
          loanAmount: '',
          rateOfInterest: '',
          tenure: '',
          emiAmount: ''
        }
    );
    
    const [meta, setMeta] = useState({loanAmount: 0, interestAmount: 0, finalBalance: 0});
    const [data, setData] = useState([]);
    
    function calculate() {
        const loan = new LoanJS.Loan(
            loanAmount,
            tenure * 12, 
            rateOfInterest,
            false
        );
        const {installments, amount, sum, interestSum } = loan;

        setMeta({
            loanAmount: amount ?? 0,
            tenure,
            rateOfInterest,
            finalBalance: sum,
            interestAmount: interestSum,
            emi:installments[0].installment
        });

        setData(installments)
    }

    return (
        <>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="display-6">EMI Calculator</h1>
                        <p className="lead">Tip: Your loan tenure must be very less</p>
                        <div className="row">
                            <DataOverview meta={meta} />
                        </div>
                    </div>
                    <div className="col-md-4" style={{margin: 'auto 0', paddingTop: '5rem'}}>
                        <form>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">&#8377;</span>
                                    </div>
                                    <Input name='loanAmount' value={loanAmount} onChange={handleChange} placeholder="Loan Amount" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <Input name='tenure' value={tenure} onChange={handleChange} placeholder="Loan Tenure" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">Years</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group mb-3">
                                    <Input name='rateOfInterest' value={rateOfInterest} onChange={handleChange} placeholder="Rate of Interest (%)" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-block btn-dark btn-outline" disabled={!tenure || !rateOfInterest || !loanAmount} onClick={(e) =>{e.preventDefault(); calculate()}}>Calculate</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <AmountVsInterestChart  meta={meta}/>
            </div>
            <div className="col-md-8">
                { data && <Breakup data={data} /> }
            </div>
        </div>
        </>
    )
}
