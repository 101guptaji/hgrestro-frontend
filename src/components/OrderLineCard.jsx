import { GiSandsOfTime } from "react-icons/gi";
import { PiForkKnife } from 'react-icons/pi';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import axios from 'axios';

const getTime = (timestamp) => {
    const time = new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return time;
};

const typeMap = { "dineIn": "Dine In", "takeAway": "Take Away" };

const OrderLineCard = ({ order, getOrders }) => {
    // console.log(order);

    // Determining background colors based on status
    const getCardColors = () => {
        switch (order.status) {
            case "processing":
                return {
                    cardBg: "#ffe3bb",
                    statusBg: "#fcc373",
                    statusText: "#d77300",
                    badgeBg: "#fcc373",
                    badgeText: "#d77300",
                    typeBg: "#ffe3bb",
                    typeText: "#ff9500",
                };
            case "done":
                return order.type === "takeAway"
                    ? {
                        cardBg: "#c2d4d8",
                        statusBg: "#9aadb2",
                        statusText: "#3b403c",
                        badgeBg: "#9aadb2",
                        badgeText: "#3b403c",
                        typeBg: "#c2d4d9",
                        typeText: "#3181a3",
                    }
                    : {
                        cardBg: "#b9f8c9",
                        statusBg: "#31ff65",
                        statusText: "#0d902e",
                        badgeBg: "#31ff65",
                        badgeText: "#0d902e",
                        typeBg: "#b9f8c9",
                        typeText: "#34c759",
                    };
            default:
                return {
                    cardBg: "#ffe3bb",
                    statusBg: "#fcc373",
                    statusText: "#d77300",
                    badgeBg: "#fcc373",
                    badgeText: "#d77300",
                    typeBg: "#ffe3bb",
                    typeText: "#ff9500",
                };
        }
    };

    let colors = getCardColors();

    const updateOrder = async () => {
        try {
            await axios.patch(`https://hgrestro-backend.onrender.com/api/orders/${order._id}`);
            getOrders();
        }
        catch (error) {
            console.log("Error in updating order: ", error);
        }
    }

    const getStatusDetails = () => {
        const orderTime = new Date(order.timestamp);
        const elapseTimeMs = new Date() - orderTime;
        const elapseTimeMin = Math.floor(elapseTimeMs / 60000);
        const remainingTime = order.deliveryTime - elapseTimeMin;

        if (remainingTime <= 0) {
            if (order.status !== 'done'){
                updateOrder();
            }

            return order.type === 'dineIn' ? 'Served' : 'Not Picked Up';
        }
        return `Ongoing: ${remainingTime} min`;
    }

    return (
        <div className='orderline-card' style={{ backgroundColor: `${colors.cardBg}` }}>
            <div className="card-header">
                <div className="order-details">
                    <div className="order-no">
                        <PiForkKnife />
                        <h4># {order.orderNo}</h4>
                    </div>
                    {order.type === 'dineIn' && <p>Table-{String(order.tableNo).padStart(2, '0')}</p>}
                    <p>{getTime(order.timestamp)}</p>
                    <h6>{order.products.length} item</h6>
                </div>

                <div className="type-badge" style={{ backgroundColor: `${colors.typeBg}` }}>
                    <div className="order-type" style={{ color: `${colors.typeText}` }}> {typeMap[order.type]}</div>
                    <div className="status-details">{getStatusDetails()}</div>
                </div>
            </div>

            <div className="card-items">
                {order && order.products
                    && order.products.map((item, index) => (
                        <div className='card-item' key={index}>
                            <span>{item.quantity} x</span>
                            <span>{item.name}</span>
                        </div>
                    ))}
            </div>

            <div className="status-badge" style={{ backgroundColor: `${colors.badgeBg}` }}>
                {
                    order.status === "processing" ?
                        (
                            <span style={{ color: `${colors.badgeText}` }}>Processing <GiSandsOfTime /></span>
                        )
                        :
                        (
                            <span style={{ color: `${colors.badgeText}` }}>Order Done <IoCheckmarkDoneCircle /></span>

                        )
                }
            </div>
        </div>
    )
}

export default OrderLineCard