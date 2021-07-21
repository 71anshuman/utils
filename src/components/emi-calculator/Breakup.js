import React, { useState } from 'react'
import { numberFormat } from '../../helpers/helpers'

export default function Breakup(props) {
    const { data } = props;
    const [showTable, setShowTable] = useState(false);

    return (
        <div className="row">
            <div className="col-md-12">
                {data.length > 0 &&
                    <button className="btn btn-light text-uppercase" onClick={(() => setShowTable(state => !state))}> { showTable ? 'hide breakup' : 'Show breakup' }</button>
                }
                {showTable &&
                    <div class="table-responsive">
                        <table className="table table-striped table-hover table-sm scroll">
                            <caption className="text-uppercase text-muted text-center">Loan repayment Breakup</caption>
                            <thead>
                            <tr>
                                {/* <th>Year</th> */}
                                {/* <th>Month</th> */}
                                <th>Months</th>
                                <th>Balance@Bigin</th>
                                <th>EMI</th>
                                <th>Investment</th>
                                <th>Interest</th>
                                <th>Balance@End</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((rec, i) => {
                                const { installment, capital, interest, remain } = rec;
                                ++i;

                                return <tr key={i}>
                                    <td>{ i }</td>
                                    <td>{ numberFormat(remain+capital) }</td>
                                    <td>{numberFormat(installment)}</td>
                                    <td>{ numberFormat(capital) }</td>
                                    <td>{ numberFormat(interest) }</td>
                                    <td>
                                    { numberFormat(remain) }
                                    </td>
                                </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}
