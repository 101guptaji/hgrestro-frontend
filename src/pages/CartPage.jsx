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
import axios from 'axios';

const CartPage = () => {
    const navigate = useNavigate();
    const [showCookingModal, setShowCookingModal] = useState(false);
    const [cookingInstructions, setCookingInstructions] = useState(null);
    const [orderType, setOrderType] = useState('dineIn'); // dineIn or takeAway

    const selectedItems = useSelector(state => state.food.selectedItems);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    const deliveryCharge = 50;
    const taxes = 5;

    const calculateTotal = () => {
        const itemTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const grandTotal = itemTotal + taxes + (orderType === 'takeAway' ? deliveryCharge : 0);
        return {
            itemTotal,
            grandTotal
        };
    };

    const deliveryTime = selectedItems.reduce((sum, item) => sum + (item.bakingTime * item.quantity), 0);

    async function handleOrderSubmit() {
        if (selectedItems.length === 0) {
            alert("Please add a item to cart");
        }
        else {
            const newOrder = {
                type: orderType,
                deliveryTime,
                products: selectedItems,
                orderTotal: calculateTotal().grandTotal,
                userName: userDetails.name,
                userPhone: userDetails.phone,
                deliveryAddress: userDetails.address+", "+userDetails.pincode,
                cookingInstructions,
            }

            await axios.post('http://localhost:8080/api/order', newOrder)
            .then(res => res.data)
            .then(data =>{
                console.log(data);
                alert(`Congratutations \nYour order is placed.\nYour order no. is ${data.orderId}\n\nThank you`);
            })
            .catch((err)=>{
                console.log("Error in placing order", err);
                alert(`${err.status}!\nError in placing order,\n ${err?.response?.data?.message}`);
            })

        }
        navigate("/");
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
                    {cookingInstructions || "Add cooking instructions (optional)"}
                </p>

                {showCookingModal && <CookingInstuctionModal setShowModal={setShowCookingModal} setCookingInstructions={setCookingInstructions} />}

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

                <PriceBreakdown orderType={orderType} deliveryCharge={deliveryCharge} taxes={taxes} calculateTotal={calculateTotal} />
            </div>

            <UserDetails deliveryTime={deliveryTime} />

            <SwipeToOrder handleOrderSubmit={handleOrderSubmit} />
        </div>
    );
};

export default CartPage;