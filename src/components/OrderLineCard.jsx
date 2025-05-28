import React from 'react'
import { GiSandsOfTime } from "react-icons/gi";
import { PiForkKnife } from 'react-icons/pi';
import { IoCheckmarkDoneCircle } from "react-icons/io5";


const OrderLineCard = ({ order, position }) => {
    // Determine background colors based on status
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
                return order.type === "Take Away"
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

    const colors = getCardColors();

    return (
        <div className='orderline-card' style={{ backgroundColor: `${colors.cardBg}` }}>
            <div className="card-header">
                <div className="order-details">
                    <div className="order-no">
                        <PiForkKnife />
                        <h4># {order.id}</h4>
                    </div>
                    <p>Table-{order.tableNo}</p>
                    <p>{order.time}</p>
                    <h6>{order.products.length} item</h6>
                </div>

                <div className="type-badge" style={{ backgroundColor: `${colors.typeBg}` }}>
                    <div className="order-type" style={{ color: `${colors.typeText}` }}> {order.type}</div>
                    <div className="status-details">{order.statusDetail}</div>
                </div>
            </div>

            <div className="card-items">
                {order && order.products
                    && order.products.map((item, index) => (
                        <div className='card-item'>
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
                            <span style={{ color: `${colors.badgeText}` }}>Order Done <IoCheckmarkDoneCircle/></span>

                        )
                }
            </div>
        </div>
    )
}

export default OrderLineCard