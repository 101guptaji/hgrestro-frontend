// import PieChart from '../components/PieChart';
import { PieChart, Pie, Cell } from 'recharts';
import ProgressBar from './ProgressBar';

const OrderSummeryCard = ({ orderSummary }) => {
    const COLORS = ['#5B5B5B', '#828282', '#2C2C2C'];

    return (
        <div className='chart-container'>
            <div className="chart-header">
                <h2>Order Summary</h2>
                <select className="chart-filter" defaultValue="daily">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div className="chart-summary">
                <div className="summary-stats">
                    {
                        orderSummary && orderSummary.map((entry, index) => (
                            <div key={index} className="summary-item">
                                <h4>{String(entry.value).padStart(2, '0')}</h4>
                                <p>{entry.name}</p>
                            </div>
                        ))
                    }
                </div>

                <div className="piechart-container">
                    <PieChart width={120} height={120}>
                        <Pie
                            data={orderSummary}
                            cx={50}
                            cy={50}
                            innerRadius={35}
                            outerRadius={50}
                            fill="none"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {orderSummary.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                    <div className="chart-legend">
                        {
                            orderSummary && orderSummary.map((entry, index) => (
                                <div className="legend-item" key={index}>
                                    <span>{entry.name}</span>
                                    <span>({entry.percentage})</span>
                                    <ProgressBar color={COLORS[index % COLORS.length]}
                                        progress={entry.percentage}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummeryCard