import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/Slices/foodSlice';

const CartOrders = () => {
    const selectedItems = useSelector(state => state.food.selectedItems);
    // console.log(selectedItems);

    const dispatch = useDispatch();

    const handleIncreament = (itemId) => {
        dispatch(incrementQuantity({id: itemId }));
    };

    const handleDecreament = (itemId) => {
        dispatch(decrementQuantity({id: itemId }));
    }

    const handleRemove = (itemId) =>{
        dispatch(removeItem({id: itemId}));
    }

    return (
        <div className='orders-container'>{
            selectedItems.map((item) => (
                <div className="item-card" key={item.id}>
                    <img src={item.image} alt="foodImage" />
                    <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>₹ {item.price}</p>
                        <div className="food-quantity-btns">
                            <button className="minus-button" onClick={() => handleDecreament(item.id)}>-</button>
                            <p>{item.quantity}</p>
                            <button className="plus-button" onClick={() => handleIncreament(item.id)}>+</button>
                        </div>
                    </div>
                    <button className="remove-btn" onClick={()=>handleRemove(item.id)}>×</button>
                </div>
            ))}
        </div>
    )
}

export default CartOrders