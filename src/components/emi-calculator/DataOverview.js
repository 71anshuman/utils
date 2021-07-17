import React from 'react'
import { numberFormat } from '../../helpers/helpers'

export default function DataOverview({meta}) {
    const { loanAmount, emi, interestAmount, finalBalance } = meta;
    return (
        <div className="col-md-12">
            <div className="jumbotron jumbotron-fluid bg-white border-bottom border-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h4><i className="fa fa-bars"></i>
                                { numberFormat(loanAmount) }<br/>
                                <small className="text-muted">LOAN AMOUNT</small>
                            </h4>
                        </div>
                        <div className="col-md-3">
                            <h4>
                                { numberFormat(emi) }<br/>
                                <small className="text-muted">EMI AMOUNT</small>
                            </h4>
                        </div>
                        <div className="col-md-3">
                            <h4>
                                { numberFormat(interestAmount) }<br/>
                                <small className="text-muted">INTEREST</small>
                            </h4>
                        </div>
                        <div className="col-md-3">
                        <h4>
                            { numberFormat(finalBalance) }<br/>
                            <small className="text-muted text-uppercase">Amount Paid</small>
                        </h4>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
