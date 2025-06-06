import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/orderLinePage.css'
import OrderLineCard from '../components/OrderLineCard';
import axios from 'axios';

const OrderLinePage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`https://hgrestro-backend.onrender.com/api/orders`);
        const data = res.data;
        // console.log(data);

        setOrders(data);
      }
      catch (error) {
        console.log("Error in getting orders data: ", error);
      }
    }

    getOrders();
  }, []);

  return (
    <div className='orderLine-container'>
      <Sidebar selected={"orderline"} />

      <div className="heading">
        <h2>Order Line</h2>
      </div>

      <div className="orderLine-main">
        <div className="order-cards">
          {
            orders && orders.map((order) => (
              <OrderLineCard key={order._id} order={order} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default OrderLinePage