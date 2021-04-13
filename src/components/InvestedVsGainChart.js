import { Chart } from "react-google-charts";

export default function InvestedVsGainChart(props) {
    const { meta } = props;
    const { investmentAmount, interestAmount } = meta;
    return (
        <div>
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
                options={{
                    title: 'Gain VS Invested',
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
                />
        </div>
    )
}
