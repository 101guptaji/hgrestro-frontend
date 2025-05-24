import { useState } from 'react';
import '../styles/cartPage.css';

import CartOrders from '../components/CartOrders';
import { useSelector } from 'react-redux';
import SwipeToOrder from '../components/SwipeToOrder';
import { useNavigate } from 'react-router-dom';
import MenuWelcome from '../components/MenuWelcome';

const CartPage = () => {
    const navigate = useNavigate();
    const [cookingInstructions, setCookingInstructions] = useState('');
    const [orderType, setOrderType] = useState('dineIn'); // dineIn or takeAway

    const selectedItems = useSelector(state => state.food.selectedItems);

    const userDetails = useSelector(state => state.food.userDetails);

    const deliveryTime = selectedItems.reduce((sum, item) => sum + (item.bakingTime * item.quantity), 0);

    const deliveryCharge = 50;
    const taxes = 5;

    const calculateTotal = () => {
        const itemTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + taxes;
        const grandTotal = itemTotal + (orderType === 'takeAway' ? deliveryCharge : 0);
        return {
            itemTotal,
            grandTotal
        };
    };

    function handleOrderSubmit() {
        if (selectedItems.length === 0) {
            alert("Please add a item to cart");
            navigate("/");
        }

    }

    return (
        <div className="container">
            <MenuWelcome />
            
            <CartOrders />

            <div className="order-details">
                <textarea
                    placeholder="Add cooking instructions (optional)"
                    value={cookingInstructions}
                    onChange={(e) => setCookingInstructions(e.target.value)}
                    className="cooking-instructions"
                />

                <div className="order-type">
                    <button
                        className={`type-btn ${orderType === 'dineIn' ? 'active' : ''}`}
                        onClick={() => setOrderType('dineIn')}
                    >
                        Dine In
                    </button>
                    <button
                        className={`type-btn ${orderType === 'takeAway' ? 'active' : ''}`}
                        onClick={() => setOrderType('takeAway')}
                    >
                        Take Away
                    </button>
                </div>

                <div className="price-breakdown">
                    <div className="price-row">
                        <span>Item Total</span>
                        <span>₹{calculateTotal().itemTotal}.00</span>
                    </div>
                    <div className="price-row">
                        <span>Taxes</span>
                        <span>₹{taxes}.00</span>
                    </div>

                    {orderType === 'takeAway' && (
                        <>
                            <div className="price-row">
                                <span>Delivery Charge</span>
                                <span>₹{deliveryCharge}.00</span>
                            </div>

                        </>
                    )}

                    <div className="price-row total">
                        <span>Grand Total</span>
                        <span>₹{calculateTotal().grandTotal}.00</span>
                    </div>
                </div>
            </div>
            <div className="user-details">
                <h4>Your details</h4>
                <p className="user-name">{userDetails.userName}, {userDetails.userPhone}</p>
                <div className="delivery-info">
                    <p>
                        <span className="location-icon">📍</span>
                        {userDetails.deliveryAddress}
                    </p>
                    <p>
                        <span className="time-icon">⏱</span>
                        Delivery in {deliveryTime} mins
                    </p>
                </div>
            </div>

            {/* <button className="order-btn">
                <span className="arrow">→</span>
                <span>Swipe to Order</span>
            </button> */}

            <SwipeToOrder handleOrderSubmit={handleOrderSubmit} />
        </div>
    );
};

export default CartPage;