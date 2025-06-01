import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../redux/Slices/foodSlice';

const FoodCard = ({ item }) => {
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

    const dispatch = useDispatch();

    const handleIncreament = (itemId) => {
        dispatch(incrementQuantity({ id: itemId }));
    };

    const handleDecreament = (itemId) => {
        dispatch(decrementQuantity({ id: itemId }));
    }

    return (
        <div className="food-card">
            {imageSrc ? <img src={imageSrc} alt={item.name} /> : <p>Loading image...</p>}
            <div className="food-info">
                <h3>{item.name}</h3>
                <div className="food-price">
                    <p>₹ {item.price}</p>
                    {item.quantity > 0 ? (
                        <div className="food-quantity-btns">
                            <button className="minus-button" onClick={() => handleDecreament(item.id)}>-</button>
                            <p>{item.quantity}</p>
                            <button className="plus-button" onClick={() => handleIncreament(item.id)}>+</button>
                        </div>
                    ) : (
                        <button className="plus-button" style={{ border: "none", fontSize: "24px" }} onClick={() => handleIncreament(item.id)}>+</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FoodCard