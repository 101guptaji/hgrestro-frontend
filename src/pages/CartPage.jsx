import { useState } from 'react';
import '../styles/cartPage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuWelcome from '../components/MenuWelcome';
import CartOrders from '../components/CartOrders';
import PriceBreakdown from '../components/PriceBreakdown';
import UserDetails from '../components/UserDetails';
import SwipeToOrder from '../components/SwipeToOrder';
import CookingInstuctionModal from '../components/CookingInstuctionModal';

const CartPage = () => {
    const navigate = useNavigate();
    const [showCookingModal, setShowCookingModal] = useState(false);
    const [cookingInstructions, setCookingInstructions] = useState("Add cooking instructions (optional)");
    const [orderType, setOrderType] = useState('dineIn'); // dineIn or takeAway

    const selectedItems = useSelector(state => state.food.selectedItems);

    const deliveryTime = selectedItems.reduce((sum, item) => sum + (item.bakingTime * item.quantity), 0);

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
                <p
                    className="cooking-instructions"
                    onClick={() => setShowCookingModal(true)}
                >
                    {cookingInstructions}
                </p>

                {showCookingModal && <CookingInstuctionModal setShowModal={setShowCookingModal} setCookingInstructions={setCookingInstructions}/>}

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

                <PriceBreakdown orderType={orderType} />
            </div>

            <UserDetails deliveryTime={deliveryTime} />

            <SwipeToOrder handleOrderSubmit={handleOrderSubmit} />
        </div>
    );
};

export default CartPage;