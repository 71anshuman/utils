import { Chart } from "react-google-charts";

export default function InvestedVsGainChart({ meta, theme }) {
    const { investmentAmount, interestAmount } = meta;
    const textColor = theme === 'dark' ? '#E6E1E5' : '#1C1B1F';
    
    return (
        <div>
            {investmentAmount !== 0 &&
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Amount', 'INR'],
                        ['Invested', investmentAmount],
                        ['Gain', interestAmount],
                    ]}
                    options={
                        {
                            title: 'Gain VS Invested',
                            is3D: false,
                            pieHole: 0.4,
                            backgroundColor: 'transparent',
                            legend: { textStyle: { color: textColor, fontName: 'Inter' } },
                            titleTextStyle: {
                                fontSize: 16,
                                color: textColor,
                                fontName: 'Inter',
                                bold: false
                            },
                            colors: ['#D0BCFF', '#4F378B'],
                            chartArea: { width: '90%', height: '80%' }
                        }
                    }
                    rootProps={{ 'data-testid': '2' }}
                />
            }
        </div>
    )
}
