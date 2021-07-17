import { Chart } from "react-google-charts";

export default function AmountVsInterestChart(props) {
    const { meta } = props;
    const { loanAmount, interestAmount } = meta;

    return (
        <div>
            {loanAmount !== 0 &&
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Amount', 'INR'],
                        ['Loan Amount', loanAmount],
                        ['Interest Paid', interestAmount],
                    ]}
                    options={
                        {
                            title: 'Gain VS Invested',
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
