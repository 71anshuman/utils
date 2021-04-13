import React, { useState } from 'react'
import { numberFormat } from '../helpers/helpers';

export default function Breakup(props) {
    const { data } = props;
    const [showTable, setShowTable] = useState(false);
    return (
        <div className="row">
            <div className="col-md-12">
                {data.length > 0 &&
                    <button className="btn btn-light text-uppercase" onClick={(() => setShowTable(state => !state))}> { showTable ? 'hide table' : 'Show Detail' }</button>
                }
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
