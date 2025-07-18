import { useEffect, useState } from 'react'
import axios from 'axios';

import '../styles/orderLinePage.css'

import Sidebar from '../components/Sidebar'
import OrderLineCard from '../components/OrderLineCard';

const OrderLinePage = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(`https://hgrestro-backend.onrender.com/api/orders`);
      const data = res.data;

      setOrders(data);
    }
    catch (error) {
      console.log("Error in getting orders data: ", error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='orderLine-container'>
      <Sidebar selected={"orders"} />

      <div className="heading">
        <h2>Order Line</h2>
      </div>

      <div className="orderLine-main">
        <div className="order-cards">
          {
            orders && orders.map((order) => (
              <OrderLineCard key={order._id} order={order} getOrders={getOrders}/>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default OrderLinePage