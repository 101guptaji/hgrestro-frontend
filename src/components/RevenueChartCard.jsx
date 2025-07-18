import { useState, useEffect } from 'react'
import { BarChart, XAxis, Tooltip, Bar, LineChart, Line } from 'recharts';
import axios from 'axios';

const RevenueChartCard = () => {
    const [filter, setFilter] = useState('daily');
    const [revenueData, SetRevenueData] = useState([]);

    useEffect(() => {
        const getRevenueData = async () => {
            try {
                let res;
                switch (filter) {
                    case "yearly":
                        res = await axios.get(`https://hgrestro-backend.onrender.com/api/orders/revenueByYear`);
                        break;
                    case "monthly":
                        res = await axios.get(`https://hgrestro-backend.onrender.com/api/orders/revenueByMonth`);
                        break;
                    case "weekly":
                        res = await axios.get(`https://hgrestro-backend.onrender.com/api/orders/revenueByWeek`);
                        break;
                    default:
                        res = await axios.get(`https://hgrestro-backend.onrender.com/api/orders/revenueByDay`);
                        break;
                }

                const data = res.data;
                // console.log(data);
                SetRevenueData([...data]);
            }
            catch (error) {
                console.log("Error in getting revenue data: ", error);
            }
        };

        getRevenueData();
    }, [filter])

    return (
        <div className='chart-container'>
            <div className="chart-header">
                <h2>Revenue</h2>
                <select className="chart-filter" defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="chart-summary">
                <div className="barChart-container">
                    <LineChart width={340} height={190} style={{paddingBottom: '20px'}} data={revenueData}>
                        <Line type="monotone" dataKey="revenue" stroke="#2A2A2A" strokeWidth={2} />
                    </LineChart>
                    <div className="lineChart">
                        <BarChart width={350} height={210} style={{maxHeight:'25vh'}} data={revenueData} >
                            <XAxis dataKey="label" fontSize={'10px'} />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="rgba(42, 42, 42, 0.3)" />
                        </BarChart>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RevenueChartCard