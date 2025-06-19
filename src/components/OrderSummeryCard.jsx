import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import ProgressBar from './ProgressBar';
import axios from 'axios'

const COLORS = ['#5B5B5B', '#828282', '#2C2C2C'];

const OrderSummeryCard = () => {

    const [filter, setFilter] = useState('daily');
    const [orderSummary, setOrderSummary] = useState([]);

    useEffect(() => {
        const getOrderSummaryData = async () => {
            try {
                const res = await axios.get(`https://hgrestro-backend.onrender.com/api/orders/summary`, {
                    params: {
                        filter: filter
                    }
                });
                const data = res.data;
                // console.log(data);

                const served = data.doneCount;
                const dineIn = data.dineInCount;
                const takeAway = data.takeAwayCount;

                let servedPercentage = 0, dineInPercentage = 0, takeAwayPercentage = 0;

                const total = dineIn + takeAway;
                if (total !== 0) {
                    servedPercentage = (served / total) * 100;
                    dineInPercentage = (dineIn / total) * 100;
                    takeAwayPercentage = (takeAway / total) * 100;
                }

                setOrderSummary([{ name: 'Served', value: served, percentage: (servedPercentage).toFixed(2) },
                { name: 'Dine In', value: dineIn, percentage: (dineInPercentage).toFixed(2) },
                { name: 'Take Away', value: takeAway, percentage: (takeAwayPercentage).toFixed(2) }]);
            }
            catch (error) {
                console.log("Error in getting summary: ", error);
            }
        };

        getOrderSummaryData();
    }, [filter])


    return (
        <div className='chart-container'>
            <div className="chart-header">
                <h2>Order Summary</h2>
                <select className="chart-filter" defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
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