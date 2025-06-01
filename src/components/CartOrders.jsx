import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/Slices/foodSlice';

const CartOrders = ({ item }) => {
    const selectedItems = useSelector(state => state.food.selectedItems);
    // console.log(selectedItems);

    const dispatch = useDispatch();

    const handleIncreament = (itemId) => {
        dispatch(incrementQuantity({ id: itemId }));
    };

    const handleDecreament = (itemId) => {
        dispatch(decrementQuantity({ id: itemId }));
    }

    const handleRemove = (itemId) => {
        dispatch(removeItem({ id: itemId }));
    }

    const [imageSrc, setImageSrc] = useState(null);
        // console.log(folder, item.image);
    
        useEffect(() => {
            const loadImage = async () => {
                try {
                    const img = await import(`../assets/${item.image}`);
                    setImageSrc(img.default);
                } catch (err) {
                    console.error("Image load failed for:", item.image, err);
                }
            };
    
            loadImage();
        }, [item]);

    return (
        <div className="item-card" key={item.id}>
            {imageSrc ? <img src={imageSrc} alt={item.name} /> : <p>Loading image...</p>}
            <div className="item-info">
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>
                <div className="food-quantity-btns">
                    <button className="minus-button" onClick={() => handleDecreament(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button className="plus-button" onClick={() => handleIncreament(item.id)}>+</button>
                </div>
            </div>
            <button className="remove-btn" onClick={() => handleRemove(item.id)}>×</button>
        </div>
    )
}

export default CartOrders
