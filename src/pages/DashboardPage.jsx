import { useState, useEffect } from 'react'
import { PiBowlFoodBold } from "react-icons/pi";
import { MdCurrencyRupee, MdOutlinePeopleAlt } from 'react-icons/md'
import { LiaIdBadgeSolid } from "react-icons/lia";
import Sidebar from '../components/Sidebar'
import AnalyticsCard from '../components/AnalyticsCard'
import OrderSummeryCard from '../components/OrderSummeryCard'
import RevenueChartCard from '../components/RevenueChartCard'
import TableSummaryCard from '../components/TableSummaryCard'
import ChefTable from '../components/ChefTable'
import '../styles/dashboardPage.css'
import axios from 'axios'

const DashboardPage = () => {
    const [chefData, setChefData] = useState([]);
    const [stats, setStats] = useState({});
    const [filter, setFilter] = useState('all');
    const baseURL = process.env.REACT_APP_API_URL;

    const getChefData = async () => {
        try {
            
            const res = await axios.get(`${baseURL}/api/chef`);
            const data = res.data;
            // console.log(data);

            setChefData(data);
        }
        catch (error) {
            console.log("Error in getting chef data: ", error);
        }
    };

    const calculateStats = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/orders/analytics`);
            // console.log(res.data);
            const data = res.data;
            setStats({ ...data});
        }
        catch (error) {
            console.log("Error in get analytics data: ", error);
        }
    };

    useEffect(() => {
        getChefData();
        calculateStats();
    }, []);

    return (
        <div className='dashboard'>
            <Sidebar selected={"dashboard"} />

            {/* Search filter */}
            <select className="filter-box" defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="analytics">Analytics</option>
                <option value="orderSummary">Order Summary</option>
                <option value="revenue">Revenue</option>
                <option value="table">Table</option>
                <option value="chef">Chef</option>
            </select>

            <div className="main-container">
                <h2>Analytics</h2>
                {
                    (filter === 'all' || filter === 'analytics') &&
                    <div className="analytics-cards">
                        <AnalyticsCard icon={<PiBowlFoodBold />} label="TOTAL CHEF" value={chefData.length} />
                        <AnalyticsCard icon={<MdCurrencyRupee />} label="TOTAL REVENUE" value={stats.totalRevenue} />
                        <AnalyticsCard icon={<LiaIdBadgeSolid />} label="TOTAL ORDERS" value={stats.totalOrders} />
                        <AnalyticsCard icon={<MdOutlinePeopleAlt />} label="TOTAL CLIENTS" value={stats.totalClients} />
                    </div>
                }


                <div className="charts-grid">
                    {
                        (filter === 'all' || filter === 'orderSummary') && <OrderSummeryCard />
                    }
                    {
                        (filter === 'all' || filter === 'revenue') && <RevenueChartCard />
                    }
                    {
                        (filter === 'all' || filter === 'table') && <TableSummaryCard />
                    }
                </div>

                {
                    (filter === 'all' || filter === 'chef') && <ChefTable chefData={chefData} />
                }


            </div>
        </div>
    )
}

export default DashboardPage