import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/dashboardPage.css'
import { BiChevronDown } from 'react-icons/bi'
import AnalyticsCard from '../components/AnalyticsCard'
import { PiBowlFoodBold } from "react-icons/pi";
import { MdCurrencyRupee, MdOutlinePeopleAlt } from 'react-icons/md'
import { LiaIdBadgeSolid } from "react-icons/lia";
import OrderSummeryCard from '../components/OrderSummeryCard'

const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');
    const [revenueFilter, setRevenueFilter] = useState('Daily');

    // Sample order data based on your schema
    const sampleOrders = [
        {
            orderId: 1,
            type: 'dineIn',
            deliveryTime: 30,
            products: ['Pizza', 'Coke'],
            orderTotal: 850,
            userName: 'John Doe',
            userPhone: '1234567890',
            tableNo: 4,
            status: 'done',
            chefId: 'chef1',
            timestamp: new Date('2024-01-15T10:30:00')
        },
        {
            orderId: 2,
            type: 'takeAway',
            deliveryTime: 20,
            products: ['Burger', 'Fries'],
            orderTotal: 650,
            userName: 'Jane Smith',
            userPhone: '0987654321',
            status: 'processing',
            chefId: 'chef2',
            timestamp: new Date('2024-01-15T11:15:00')
        },
        // Add more sample orders...
    ];

    useEffect(() => {
        setOrders(sampleOrders);
    }, []);

    const calculateStats = () => {
        const totalChefs = 4;
        const totalRevenue = orders.reduce((sum, order) => sum + order.orderTotal, 0);
        const totalOrders = orders.length;
        const totalClients = new Set(orders.map(order => order.userName)).size;

        return { totalChefs, totalRevenue, totalOrders, totalClients };
    };

    const getOrderSummaryData = () => {
        const served = 9; //orders.filter(order => order.status === 'done').length;
        const dineIn = 6; //orders.filter(order => order.type === 'dineIn').length;
        const takeAway = 5; //orders.filter(order => order.type === 'takeAway').length;

        const per = (100/(dineIn+takeAway)).toFixed(2);

        return [{ name: 'Served', value: served, percentage:  served*per},
            { name: 'Dine In', value: dineIn, percentage:  dineIn*per },
            { name: 'Take Away', value: takeAway, percentage:  takeAway*per }]
    };

    const getRevenueData = () => {
        // Generate sample revenue data for the chart
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map((day, index) => ({
            day,
            revenue: Math.floor(Math.random() * 1000) + 500
        }));
    };

    const getChefData = () => {
        return [
            { name: 'Manesh', orders: 3 },
            { name: 'Pritam', orders: 7 },
            { name: 'Yash', orders: 5 },
            { name: 'Tenzen', orders: 8 }
        ];
    };

    const stats = calculateStats();
    const orderSummary = getOrderSummaryData();
    const revenueData = getRevenueData();
    const chefData = getChefData();

    return (
        <div className='dashboard'>
            <Sidebar selected={"dashboard"} />

            {/* Search filter */}
            <div className="filter-box">
                <input
                    type="text"
                    placeholder='Filter...' />

                <div className="downIcon">
                    <BiChevronDown />
                </div>
            </div>

            <div className="main-container">
                <h2>Analytics</h2>

                <div className="analytics-cards">
                    <AnalyticsCard icon={<PiBowlFoodBold />} label="TOTAL CHEF" value={stats.totalChefs} />
                    <AnalyticsCard icon={<MdCurrencyRupee />} label="TOTAL REVENUE" value={stats.totalRevenue} />
                    <AnalyticsCard icon={<LiaIdBadgeSolid />} label="TOTAL ORDERS" value={stats.totalOrders} />
                    <AnalyticsCard icon={<MdOutlinePeopleAlt />} label="TOTAL CLIENTS" value={stats.totalClients} />
                </div>

                <div className="charts-grid">
                    <OrderSummeryCard orderSummary={orderSummary} />
                    <OrderSummeryCard orderSummary={orderSummary} />
                    <OrderSummeryCard orderSummary={orderSummary} />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage