import { Chart } from "react-google-charts";

export default function AmountVsInterestChart({ meta, theme }) {
    const { loanAmount, interestAmount } = meta;
    const textColor = theme === 'dark' ? '#E6E1E5' : '#1C1B1F';

    return (
        <div>
            {loanAmount !== 0 &&
                <Chart
                    width={'100%'}
                    height={'350px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Amount', 'INR'],
                        ['Principal Loan', loanAmount],
                        ['Interest Paid', interestAmount],
                    ]}
                    options={{
                        title: 'Interest VS Principal',
                        is3D: false,
                        pieHole: 0.4,
                        backgroundColor: 'transparent',
                        legend: { textStyle: { color: textColor, fontName: 'Outfit' } },
                        titleTextStyle: {
                            fontSize: 16,
                            color: textColor,
                            fontName: 'Outfit',
                            bold: false
                        },
                        colors: ['#818cf8', '#c084fc'],
                        chartArea: { width: '90%', height: '80%' }
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            }
        </div>
    )
}
