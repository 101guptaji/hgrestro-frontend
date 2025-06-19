import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/cartPage.css';

import MenuWelcome from '../components/MenuWelcome';
import CartOrders from '../components/CartOrders';
import PriceBreakdown from '../components/PriceBreakdown';
import UserDetails from '../components/UserDetails';
import SwipeToOrder from '../components/SwipeToOrder';
import CookingInstuctionModal from '../components/CookingInstuctionModal';
import { clearCart } from '../redux/Slices/foodSlice';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // local states
    const [showCookingModal, setShowCookingModal] = useState(false);
    const [cookingInstructions, setCookingInstructions] = useState(null);
    const [orderType, setOrderType] = useState('dineIn'); // dineIn or takeAway
    const [userDetails, setUserDetails] = useState({
        userName: '',
        userPhone: ''
    })
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [swipeKey, setSwipeKey] = useState(0);
    const [debouncedInput, setDebouncedInput] = useState('');

    // redux state
    const selectedItems = useSelector(state => state.food.selectedItems);

    const deliveryCharge = 50;
    const taxes = 5;

    // memoization
    const [deliveryTime, itemTotal] = useMemo(() => {
        return [selectedItems.reduce((sum, item) => sum + (item.bakingTime * item.quantity), 0),
                selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)];
    }, [selectedItems]);

    const grandTotal = useMemo(()=>{
        return itemTotal + taxes + (orderType === 'takeAway' ? deliveryCharge : 0);
    },[itemTotal, orderType]);

    // Order placing function
    async function handleOrderSubmit() {
        if (selectedItems.length === 0) {
            alert("Please add a item to cart");
            navigate("/menu");
        }
        else if (userDetails === null || userDetails.userName.trim() === '' || !/^\d{10}$/.test(userDetails.userPhone.toString())) {
            alert("Please enter your name and 10-digits phone number");
            setSwipeKey(prev => prev + 1);
        }
        else if (orderType === 'takeAway' && deliveryAddress.trim() === '') {
            alert("Please enter a address for delivery.");
            setSwipeKey(prev => prev + 1);
        }
        else {
            const newOrder = {
                type: orderType,
                deliveryTime,
                products: selectedItems,
                orderTotal: grandTotal,
                userName: userDetails.userName,
                userPhone: userDetails.userPhone,
                deliveryAddress: deliveryAddress,
                cookingInstructions,
            }

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));

            try {
                const res = await axios.post(`https://hgrestro-backend.onrender.com/api/orders`, newOrder);
                // const res = await axios.post(`http://localhost:8080/api/orders`, newOrder);
                const data = res.data;
                // console.log(data);

                alert(`Congratutations \nYour order is placed.\nYour order no. is ${data?.orderNo}\n\nThank you`);

                dispatch(clearCart());
                navigate("/menu");
            }
            catch (err) {
                console.log("Error in placing order", err);
                alert(`${err.status}!\nError in placing order,\n ${err}`);
                setSwipeKey(prev => prev + 1);
            }
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userDetails"));
        // console.log(user)
        if (user) {
            setUserDetails({
                userName: user.userName || "",
                userPhone: user.userPhone || "",
            });
        }
        if (orderType === 'takeAway') {
            const address = JSON.parse(localStorage.getItem("deliveryAddress"));
            if (address) {
                setDeliveryAddress(address);
            }
        }
    }, [orderType])

    useEffect(() => {
        if (debouncedInput.trim() !== '') {
            navigate(`/menu?search=${encodeURIComponent(debouncedInput)}`);
        }
    }, [debouncedInput, navigate]);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <MenuWelcome setDebouncedInput={setDebouncedInput} />

                <div className='orders-container'>{
                    selectedItems.map((item) => (
                        <CartOrders item={item} key={item.id} />
                    ))}
                </div>
            </div>

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
            </div>
            <PriceBreakdown orderType={orderType} deliveryCharge={deliveryCharge} taxes={taxes} itemTotal ={itemTotal} grandTotal={grandTotal} />

            <UserDetails deliveryTime={deliveryTime} orderType={orderType} user={userDetails} setUser={setUserDetails} address={deliveryAddress} setAddress={setDeliveryAddress} />

            <SwipeToOrder handleOrderSubmit={handleOrderSubmit} key={swipeKey} />
        </div>
    );
};

export default CartPage;