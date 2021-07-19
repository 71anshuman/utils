import { Chart } from "react-google-charts";

export default function AmountVsInterestChart(props) {
    const { meta } = props;
    const { loanAmount, interestAmount } = meta;

    return (
        <div>
            {loanAmount !== 0 &&
                <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Amount', 'INR'],
                        ['Loan Amount', loanAmount],
                        ['Interest Paid', interestAmount],
                    ]}
                    options={
                        {
                            title: 'Interest VS Loan Amount',
                            is3D: true,
                            titleTextStyle: {
                                fontSize: '24px',
                            }
                        }
                    }
                    rootProps={{ 'data-testid': '2' }}
                />
            }
        </div>
    )
}
