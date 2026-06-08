import { Chart } from "react-google-charts";

export default function InterestVsLoanAmountChart({ data, theme }) {
    const textColor = theme === 'dark' ? '#E6E1E5' : '#1C1B1F';

    return (
        <div>
            {data.length > 2 &&
                <Chart
                    width={'100%'}
                    height={'350px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        title: 'Interest VS Loan Principal Over Time',
                        backgroundColor: 'transparent',
                        legend: { position: 'bottom', maxLines: 2, textStyle: { color: textColor, fontName: 'Outfit' } },
                        hAxis: { 
                            title: 'Month', 
                            titleTextStyle: { color: textColor, fontName: 'Outfit' },
                            textStyle: { color: textColor }
                        },
                        vAxis: { 
                            title: 'Amount (₹)',
                            titleTextStyle: { color: textColor, fontName: 'Outfit' },
                            textStyle: { color: textColor },
                            minValue: 0 
                        },
                        chartArea: { width: '80%', height: '70%' },
                        colors: ['#c084fc', '#818cf8'],
                        titleTextStyle: {
                            fontSize: 16,
                            color: textColor,
                            fontName: 'Outfit',
                            bold: false
                        }
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            }
        </div>
    )
}
