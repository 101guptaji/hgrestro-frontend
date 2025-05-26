import React from 'react'
import { BarChart, XAxis, Tooltip, Bar, LineChart, Line } from 'recharts';

const RevenueChartCard = ({ revenueData }) => {
    return (
        <div className='chart-container'>
            <div className="chart-header">
                <h2>Revenue</h2>
                <select className="chart-filter" defaultValue="daily">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div className="chart-summary">
                <div className="barChart-container">
                    <LineChart width={340} height={240} data={revenueData}>
                        <Line type="monotone" dataKey="revenue" stroke="#2A2A2A" strokeWidth={2} />
                    </LineChart>
                    <div className="lineChart">
                        <BarChart width={350} height={240} data={revenueData}>
                            <XAxis dataKey="day" scale="point" padding={{ left: 20, right: 20 }} />
                            <Tooltip/>
                            <Bar dataKey="revenue" fill="rgba(42, 42, 42, 0.3)" />
                        </BarChart>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default RevenueChartCard