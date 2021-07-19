import { Chart } from "react-google-charts";

export default function InterestVsLoanAmountChart(props) {
    const { data } = props;
    return (
        <div>
            {data.length > 2 &&
                <Chart
                    width={'100%'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                    title: 'Interest VS Loan Amount Payment',
                    hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0 },
                    // For the legend to fit, we make the chart area smaller
                    chartArea: { width: '60%', height: '60%' },
                    legend: { position: 'bottom', maxLines: 2 },
                    // lineWidth: 25
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                />
            }
        </div>
    )
}
