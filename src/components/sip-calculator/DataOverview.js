import React from 'react'
import { numberFormat } from '../../helpers/helpers'

export default function DataOverview({meta}) {
    const { investmentAmount, interestAmount, finalBalance } = meta;
    return (
        <div className="col-md-12">
            <div className="jumbotron jumbotron-fluid bg-white border-bottom border-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h4><i className="fa fa-bars"></i>
                                { numberFormat(investmentAmount) }<br/>
                                <small className="text-muted">INVESTED</small>
                            </h4>
                        </div>
                        <div className="col-md-4">
                            <h4>
                                { numberFormat(interestAmount) }<br/>
                                <small className="text-muted">GAIN</small>
                            </h4>
                        </div>
                        <div className="col-md-4">
                        <h4>
                            { numberFormat(finalBalance) }<br/>
                            <small className="text-muted text-uppercase">maturity value</small>
                        </h4>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
