import React from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/orderLinePage.css'
import OrderLineCard from '../components/OrderLineCard';

const OrderLinePage = () => {


  const orderData = [
    {
      id: "102",
      tableNo: "05",
      time: "9:37 AM",
      type: "Dine In",
      status: "processing",
      statusDetail: "Ongoing: 4 Min",
      products: [
        { quantity: 1, name: "Value Set Meals" },
        { quantity: 1, name: "Double Cheeseburger", note: "Add extra pickles" },
        { quantity: 1, name: "Apple Pie" },
        { quantity: 1, name: "Coca-Cola L" },
      ],
    },
    {
      id: "104",
      tableNo: "05",
      time: "9:37 AM",
      type: "Dine In",
      status: "done",
      statusDetail: "Served",
      products: [
        { quantity: 1, name: "Value Set Meals" },
        { quantity: 1, name: "Double Cheeseburger", note: "Add extra pickles" },
        { quantity: 1, name: "Apple Pie" },
        { quantity: 1, name: "Coca-Cola L" },
        { quantity: 1, name: "Value Set Meals" },
        { quantity: 1, name: "Double Cheeseburger", note: "Add extra pickles" },
        { quantity: 1, name: "Apple Pie" },
        { quantity: 1, name: "Coca-Cola L" },
      ],
    },
    {
      id: "105",
      tableNo: "05",
      time: "9:37 AM",
      type: "Take Away",
      status: "done",
      statusDetail: "Not Picked up",
      products: [
        { quantity: 1, name: "Value Set Meals" },
        { quantity: 1, name: "Apple Pie" },
        { quantity: 1, name: "Coca-Cola L" },
      ],
    },
  ];

  // Create a grid of orders with different statuses
  const orderGrid = [
    { ...orderData[0], position: { top: "65px", left: "76px" } },
    { ...orderData[1], position: { top: "65px", left: "391px" } },
    { ...orderData[2], position: { top: "65px", left: "706px" } },
    { ...orderData[0], position: { top: "65px", left: "1021px" } },
    { ...orderData[0], position: { top: "463px", left: "76px" } },
    { ...orderData[2], position: { top: "463px", left: "391px" } },
    { ...orderData[1], position: { top: "463px", left: "706px" } },
    { ...orderData[0], position: { top: "463px", left: "1021px" } },
    { ...orderData[0], position: { top: "463px", left: "1021px" } },
  ];

  return (
    <div className='orderLine-container'>
      <Sidebar selected={"orderline"} />

      {/* Search filter */}
      <div className="search-box">
        <div className="search-input">
          <input
            type="text"
            placeholder='Search' />
        </div>
      </div>

      <div className="orderLine-main">
          <h2>Order Line</h2>

          <div className="order-cards">
            {
              orderGrid && orderGrid.map((order, index)=>(
                <OrderLineCard order={order} position={order.position} />
              ))
            }
          </div>
      </div>

    </div>
  )
}

export default OrderLinePage