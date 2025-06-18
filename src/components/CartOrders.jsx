import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/Slices/foodSlice';

const CartOrders = ({ item }) => {
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
            <div className="item-img">
                {imageSrc ? <img src={imageSrc} alt={item.name} /> : <p>Loading image...</p>}
            </div>

            <div className="item-info">
                <div>
                    <h3>{item.name}</h3>
                    <p>₹ {item.price}</p>
                </div>
                <div className="quantity-btns">
                    <button className="btn" onClick={() => handleDecreament(item.id)} disabled={item.quantity <= 1}>-</button>
                    <p>{item.quantity}</p>
                    <button className="btn" onClick={() => handleIncreament(item.id)}>+</button>
                </div>
            </div>
            <button className="remove-btn" onClick={() => handleRemove(item.id)}>×</button>
        </div>
    )
}

export default CartOrders
