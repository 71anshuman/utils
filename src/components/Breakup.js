import React, { useState } from 'react'
import { numberFormat } from '../helpers/helpers';

export default function Breakup(props) {
    const { data, meta } = props;
    const [showTable, setShowTable] = useState(false);
    const { investmentAmount, interestAmount, finalBalance } = meta;
    return (
        <div className="row">
            <div className="col-md-12">
            <div className="jumbotron jumbotron-fluid bg-light border-bottom border-grey">
                <div className="container row">
                    <div className="col-md-4">
                        <h4 className="display-6">
                            { numberFormat(investmentAmount) }<br/>
                            <small className="text-muted">INVESTED</small>
                        </h4>
                    </div>
                    <div className="col-md-4">
                        <h4 className="display-6">
                            { numberFormat(interestAmount) }<br/>
                            <small className="text-muted">GAIN</small>
                        </h4>
                    </div>
                    <div className="col-md-4">
                        <h4 className="display-6">
                            { numberFormat(finalBalance) }<br/>
                            <small className="text-muted text-uppercase">maturity value</small>
                        </h4>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-md-12">
                <button className="btn btn-light text-uppercase" onClick={(() => setShowTable(state => !state))}> { showTable ? 'hide table' : 'Show Detail' }</button>
                {showTable &&
                    <table className="table table-striped table-hover table-sm scroll">
                        <caption className="text-uppercase text-muted text-center">Investment and Wealth gain Breakup</caption>
                        <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Balance@Bigin</th>
                            <th>Investment</th>
                            <th>Interest</th>
                            <th>Balance@End</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((rec, i) => {
                            const {year, month, initialBalance, investment, interest, balanceAtEndOfMonth} = rec;
                            return <tr key={i}>
                                <td>{ year }</td>
                                <td>{ month }</td>
                                <td>{ numberFormat(initialBalance) }</td>
                                <td>{ numberFormat(investment) }</td>
                                <td>{ numberFormat(interest) }</td>
                                <td>
                                { numberFormat(balanceAtEndOfMonth) }
                                </td>
                            </tr>
                            })
                        }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
